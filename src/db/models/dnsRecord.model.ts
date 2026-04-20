import {  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import Domain from './domain.model';
import sequelize from './sequelize';

class DnsRecord extends Model<InferAttributes<DnsRecord>, InferCreationAttributes<DnsRecord>> {
    declare id: CreationOptional<number>;
    declare domainId: number;
    declare type: string;
    declare host: string;
    declare value: string;
    declare purpose: CreationOptional<string>;
    declare status: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

DnsRecord.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },

    domainId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Domain,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },

    type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'DNS record type is required',
            },
        },
    },

    host: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'DNS record host is required',
            },
        },
    },

    value: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'DNS record value is required',
            },
        },
    },

    purpose: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'DKIM',
    },

    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'PENDING',
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
    },

    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
    },
}, {
    tableName: 'dns_records',
    underscored: true,
    timestamps: true,
    sequelize,
});