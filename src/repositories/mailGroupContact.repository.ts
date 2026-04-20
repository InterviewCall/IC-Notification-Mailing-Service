import { CreationAttributes, Op, Transaction } from 'sequelize';

import MailGroupContact from '../db/models/mailGroupContact.model';
import BaseRepository from './base.repository';

class MailGroupContactRepository extends BaseRepository<MailGroupContact> {
    constructor() {
        super(MailGroupContact);
    }

    async create(data: CreationAttributes<MailGroupContact>, transaction?: Transaction): Promise<MailGroupContact> {
        return await this.model.create(data, { transaction });
    }

    async createBulk(data: CreationAttributes<MailGroupContact>[], transaction: Transaction): Promise<void> {
        await this.model.bulkCreate(data, { transaction, ignoreDuplicates: true });
    }

    async findTheContactIdsByGroupId(groupId: number, contactIds: number[], transaction: Transaction): Promise<MailGroupContact[]> {
        const allContactIds = await this.model.findAll({
            where: {
                groupId,
                contactId: {
                    [Op.in]: contactIds
                }
            },
            transaction
        });

        return allContactIds;
    }
}

export default MailGroupContactRepository;