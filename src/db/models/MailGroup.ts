import { Association, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyGetAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

import MailContact from './MailContact';
import sequelize from './sequelize';

class MailGroup extends Model<InferAttributes<MailGroup>, InferCreationAttributes<MailGroup>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string | null;
    declare totalContacts: CreationOptional<number>;
    declare createdBy: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date | null>;

    declare contacts?: NonAttribute<MailContact[]>;
    declare getContacts: BelongsToManyGetAssociationsMixin<MailContact>;
    declare addContact: BelongsToManyAddAssociationMixin<MailContact, number>;
    declare addContacts: BelongsToManyAddAssociationsMixin<MailContact, number>;
    declare removeContact: BelongsToManyRemoveAssociationMixin<MailContact, number>;
    declare removeContacts: BelongsToManyRemoveAssociationsMixin<MailContact, number>;

    static associations: {
        contacts: Association<MailGroup, MailContact>
    };
}

MailGroup.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(50),
        validate: {
            notEmpty: {
                msg: 'Group name is required'
            }
        },
        allowNull: false,
        unique: {
            name: 'group_name',
            msg: 'Group name already exists'
        }
    },

    createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        validate: {
            notEmpty: {
                msg: 'Id of the creator of the group is required'
            }
        },
        allowNull: false
    },

    totalContacts: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },

    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },

    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    tableName: 'mail_groups',
    underscored: true,
    timestamps: true,
    sequelize
});

export default MailGroup;