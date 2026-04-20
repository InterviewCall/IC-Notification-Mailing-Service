import { Association, CreationOptional, DataTypes, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

import DnsRecord from './dnsRecord.model';
import sequelize from './sequelize';

class Domain extends Model<InferAttributes<Domain>, InferCreationAttributes<Domain>> {
    declare id: CreationOptional<number>;
    declare domain: string;
    declare identityType: CreationOptional<string>;
    declare verificationStatus: string | null;
    declare dkimStatus: string | null;
    declare dkimSigningAttributesOrigin: string | null;
    declare isVerified: CreationOptional<boolean>;
    declare createdBy: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date | null>;

    declare dnsRecords?: NonAttribute<DnsRecord[]>;
    declare getDnsRecords?: HasManyGetAssociationsMixin<DnsRecord>;
    declare addDnsRecords?: HasManyAddAssociationsMixin<DnsRecord, number>;

    static associations: {
        dnsRecords: Association<Domain, DnsRecord>
    };
}

Domain.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },

    domain: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
            name: 'unique_ses_domain',
            msg: 'This SES subdomain already exists',
        },
        validate: {
            notEmpty: {
                msg: 'Subdomain is required',
            },
        },
    },

    identityType: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'DOMAIN',
    },

    verificationStatus: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },

    dkimStatus: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },

    dkimSigningAttributesOrigin: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },

    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

    createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    tableName: 'domains',
    underscored: true,
    timestamps: true,
    sequelize
});

export default Domain;
