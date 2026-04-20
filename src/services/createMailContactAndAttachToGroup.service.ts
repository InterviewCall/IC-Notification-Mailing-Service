import { Options, parse } from 'csv-parse';
import fs from 'fs';
import { unlink } from 'fs/promises';
import { UniqueConstraintError } from 'sequelize';

import logger from '../configs/logger.config';
import MailContact from '../db/models/mailContact.model';
import MailGroup from '../db/models/mailGroup.model';
import MailGroupContact from '../db/models/mailGroupContact.model';
import sequelize from '../db/models/sequelize';
import MailContactDto from '../dtos/mailContact.dto';
import MailContactRepository from '../repositories/mailContact.repository';
import MailGroupRepository from '../repositories/mailGroup.repository';
import MailGroupContactRepository from '../repositories/mailGroupContact.repository';
import { CsvMapping, CsvSummary, NormalizedRow } from '../types/csv.type';
import { BadRequestError, ConflictError, InternalServerError } from '../utils/errors/app.error';
import mailContactSchema from '../validators/mailContact.validator';

class CreateContactAndAttachToGroupService {
    private mailContactRepository;
    private mailGroupRepository;
    private mailGroupContactRepository;

    constructor(mailContactRepository: MailContactRepository, mailGroupRepository: MailGroupRepository, mailGroupContactRepository: MailGroupContactRepository) {
        this.mailContactRepository = mailContactRepository;
        this.mailGroupRepository = mailGroupRepository;
        this.mailGroupContactRepository = mailGroupContactRepository;
    }

    async createContactsAndAttachToGroup(filePath: string, groupId: number, mapping: CsvMapping): Promise<CsvSummary> {
        const summary: CsvSummary = {
            totalRows: 0,
            validRows: 0,
            invalidRows: 0,
            duplicateRows: 0,
            createdContacts: 0,
            alreadyInGroup: 0,
            addedToGroup: 0
        };

        const uniqueRowsByEmail = new Map<string, NormalizedRow>();

        try {
            const options: Options = {
                columns: true,
                skip_empty_lines: true,
                trim: true,
            };

            const parser = fs.createReadStream(filePath).pipe(
                parse(options)
            );

            for await (const row of parser) {
                summary.totalRows += 1;

                const rawRow = {
                    fullName: String(row[mapping.fullName] ?? '').trim(),
                    email: String(row[mapping.email] ?? '').trim().toLowerCase()
                };

                const valiDateRow = mailContactSchema.safeParse(rawRow);

                if(!valiDateRow.success) {
                    summary.invalidRows += 1;
                    continue;
                }

                summary.validRows += 1;

                const { fullName, email } = valiDateRow.data;

                if(uniqueRowsByEmail.has(email)) {
                    summary.duplicateRows += 1;
                    continue;
                }

                uniqueRowsByEmail.set(email, { fullName, email });
            }

            const uniqueEmails: string[] = [...uniqueRowsByEmail.keys()];

            if(uniqueEmails.length == 0) {
                return summary;
            }

            return await sequelize.transaction(async (transaction) => {
                const lockedGroup: MailGroup | null = await this.mailGroupRepository.findByIdWithAcquiringLock(groupId, transaction);
                if(!lockedGroup) {
                    throw new BadRequestError(`The group does not exist with id: ${groupId}`);
                }

                const existingContacts: MailContact[] = await this.mailContactRepository.findAllByEmails(uniqueEmails, transaction);

                const existingContactEmails = new Set<string>(
                    existingContacts.map((contact) => contact.email)
                );

                const contactsToCreate: MailContactDto[] = uniqueEmails
                    .filter((email) => !existingContactEmails.has(email))
                    .map((email) => {
                        const row = uniqueRowsByEmail.get(email)!;
                        return {
                            fullName: row.fullName,
                            email: row.email
                        };
                    });

                if(contactsToCreate.length > 0) {
                    const newlyCreatedContacts: MailContact[] = await this.mailContactRepository.createBulk(contactsToCreate, transaction);
                    summary.createdContacts = newlyCreatedContacts.length;
                }

                const allContacts: MailContact[] = await this.mailContactRepository.findAllByEmails(uniqueEmails, transaction);

                const contactIds: number[] = allContacts.map((contact) => contact.id);

                const existingGroupContacts: MailGroupContact[] = await this.mailGroupContactRepository.findTheContactIdsByGroupId(groupId, contactIds, transaction);

                const existingContactIdsInGroup = new Set<number>(
                    existingGroupContacts.map((contact) => contact.contactId)
                );

                const groupContactsToCreate = allContacts
                    .filter((contact) => {
                        if(existingContactIdsInGroup.has(contact.id)) {
                            summary.alreadyInGroup += 1;
                            return false;
                        }
                        return true;
                    })
                    .map((contact) => ({ groupId, contactId: contact.id }));

                if(groupContactsToCreate.length > 0) {
                    await this.mailGroupContactRepository.createBulk(groupContactsToCreate, transaction);
                    summary.addedToGroup = groupContactsToCreate.length;

                    await this.mailGroupRepository.incrementTotalContacts(summary.addedToGroup, groupId, transaction);
                }
                return summary;
            });
        } finally {
            await unlink(filePath).catch(() => null);
        }
    }

    async createContactAndAttachToGroup(groupId: number, contactData: MailContactDto) {
        const group = await this.mailGroupRepository.findById(groupId);

        if(!group) {
            throw new BadRequestError(`The group with id: ${groupId} is not exists`);
        }

        const transaction = await sequelize.transaction();
        try {
            const lockedGroup: MailGroup | null = await this.mailGroupRepository.findByIdWithAcquiringLock(groupId, transaction);
            if(!lockedGroup) {
                throw new BadRequestError(`The group does not exist with id: ${groupId}`);
            }

            let contact = await this.mailContactRepository.findOne(
                { email: contactData.email },
                transaction
            );

            if(!contact) {
                try {
                    contact = await this.mailContactRepository.create(contactData, transaction);
                } catch (error) {
                    if(error instanceof UniqueConstraintError) {
                        contact = await this.mailContactRepository.findOne(
                            { email: contactData.email },
                            transaction
                        );

                        if(!contact) {
                            throw new InternalServerError('Failed to fetch existing contact after unique conflict');
                        }
                    } else {
                        throw error;
                    }
                }
            }

            try {
                await this.mailGroupContactRepository.create(
                    { groupId, contactId: contact.id },
                    transaction
                );
            } catch (error) {
                if(error instanceof UniqueConstraintError) {
                    throw new ConflictError('This contact is already in the group');
                }
                throw error;
            }

            await this.mailGroupRepository.incrementTotalContacts(1, groupId, transaction);
            await transaction.commit();

            return contact;
        } catch (error) {
            await transaction.rollback();
            logger.error(error);

            if(error instanceof BadRequestError || error instanceof ConflictError || error instanceof InternalServerError) {
                throw error;
            }

            throw new InternalServerError('Something went wrong');
        }
    }
}

export default CreateContactAndAttachToGroupService;