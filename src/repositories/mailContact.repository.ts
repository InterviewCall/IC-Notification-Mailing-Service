import { CreationAttributes, Op,Transaction } from 'sequelize';

import MailContact from '../db/models/mailContact.model';
import BaseRepository from './base.repository';

class MailContactRepository extends BaseRepository<MailContact> {
    constructor() {
        super(MailContact);
    }

    async create(data: CreationAttributes<MailContact>, transaction?: Transaction): Promise<MailContact> {
        return await this.model.create(data, { transaction });
    }

    async createBulk(data: CreationAttributes<MailContact>[], transaction: Transaction): Promise<MailContact[]> {
        return await this.model.bulkCreate(data, { transaction, ignoreDuplicates: true });
    }

    async findAllByEmails(emails: string[], transaction: Transaction): Promise<MailContact[]> {
        const contacts = await this.model.findAll({
            where: {
                email: {
                    [Op.in]: emails
                }
            },
            transaction
        });

        return contacts;
    }
}

export default MailContactRepository;