import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

import MailGroup from './MailGroup';
import sequelize from './sequelize';

class MailContact extends Model<InferAttributes<MailContact>, InferCreationAttributes<MailContact>> {
    declare id: CreationOptional<number>;
    declare fullName: string;
    declare email: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;

    declare groups: NonAttribute<MailGroup[]>;
    
    static associations: {
        groups: Association<MailContact, MailGroup>
    };
}

MailContact.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    fullName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(100),
        unique: {
            name: 'email',
            msg: 'Email already exists'
        },
        allowNull: false
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
        allowNull: true
    }
}, {
    tableName: 'mail_contacts',
    underscored: true,
    timestamps: true,
    sequelize
});

export default MailContact;