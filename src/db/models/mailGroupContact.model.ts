import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import MailContact from './mailContact.model';
import MailGroup from './mailGroup.model';
import sequelize from './sequelize';

class MailGroupContact extends Model<InferAttributes<MailGroupContact>, InferCreationAttributes<MailGroupContact>> {
    declare groupId: ForeignKey<MailGroup['id']>;
    declare contactId: ForeignKey<MailContact['id']>;
}

MailGroupContact.init({
    groupId: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
            model: MailGroup,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },

    contactId: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
            model: MailContact,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'mail_group_contacts',
    underscored: true,
    timestamps: false,
    sequelize
});

export default MailGroupContact;