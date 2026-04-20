import { Transaction } from 'sequelize';

import MailContact from '../db/models/mailContact.model';
import MailGroup from '../db/models/mailGroup.model';
import BaseRepository from './base.repository';

class MailGroupRepository extends BaseRepository<MailGroup> {
    constructor() {
        super(MailGroup);
    }

    async incrementTotalContacts(addedToGroup: number, groupId: number, transaction: Transaction) {
        await this.model.increment('totalContacts', {
            by: addedToGroup,
            where: {
                id: groupId
            },
            transaction
        });
    }

    async findAllConatctsInGroup(group: MailGroup): Promise<MailContact[]> {
        const allConatcts = await group.getContacts({
            attributes: ['id', 'fullName', 'email'],
            joinTableAttributes: []
        });
        return allConatcts;
    }

    async findByIdWithAcquiringLock(groupId: number, transaction: Transaction): Promise<MailGroup | null> {
        return await this.model.findByPk(groupId, {
            transaction,
            lock: transaction.LOCK.UPDATE
        });
    }
}

export default MailGroupRepository;