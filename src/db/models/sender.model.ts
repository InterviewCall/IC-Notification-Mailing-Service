import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

import Domain from './domain.model';
import sequelize from './sequelize';

class Sender extends Model<InferAttributes<Sender>, InferCreationAttributes<Sender>> {
    declare id: CreationOptional<number>;
    declare address: string;
    declare domainId: ForeignKey<Domain['id']>;
    declare createdAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date | null>;

    declare domain?: NonAttribute<Domain>;

    static associations: {
        domain: Association<Sender, Domain>
    };
}

Sender.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    address: {
        type: DataTypes.STRING(100),
        unique: {
            name: 'unique_address',
            msg: 'Sender is already exist'
        },
        allowNull: false
    },

    domainId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Domain,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },

    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    tableName: 'senders',
    underscored: true,
    timestamps: true,
    sequelize
});

export default Sender;
