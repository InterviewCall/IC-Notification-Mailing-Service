import { UniqueConstraintError } from 'sequelize';

import logger from '../configs/logger.config';
import MailContact from '../db/models/mailContact.model';
import MailGroup from '../db/models/mailGroup.model';
import MailGroupDto from '../dtos/mailGroup.dto';
import MailGroupRepository from '../repositories/mailGroup.repository';
import { BadRequestError, ConflictError, InternalServerError } from '../utils/errors/app.error';

class MailGroupService {
    public mailGroupRepository;

    constructor(mailGroupRepository: MailGroupRepository) {
        this.mailGroupRepository = mailGroupRepository;
    }

    async create(data: MailGroupDto): Promise<MailGroup> {
        try {
            const mailGroup = await this.mailGroupRepository.create(data);
            return mailGroup;
        } catch (error) {
            if(error instanceof UniqueConstraintError) {
                logger.error(error);
                throw new ConflictError(error.errors[0].message);
            }

            logger.error(error);
            throw new InternalServerError('Something went wrong!');
        }
    }

    async findAllGroups(): Promise<MailGroup[]> {
        const mailgroups = await this.mailGroupRepository.findAll();
        return mailgroups;
    }

    async findGroupById(groupId: number): Promise<MailGroup> {
        const group: MailGroup | null = await this.mailGroupRepository.findById(groupId);
        
        if(!group) {
            throw new BadRequestError(`The group does not exist with Id: ${groupId}`);
        }

        return group;
    }

    async findAllContactsByGroupId(groupId: number): Promise<MailContact[]> {
        try {
            const group = await this.mailGroupRepository.findById(groupId);

            if(!group) {
                throw new BadRequestError(`This group with id: ${groupId} is not exists`);
            }

            const allConatcts = await this.mailGroupRepository.findAllConatctsInGroup(group);
            return allConatcts;
        } catch (error) {
            logger.error(error);
            if(error instanceof BadRequestError) {
                throw error;
            }
            throw new InternalServerError('Something went wrong');
        }
    }
}

export default MailGroupService;