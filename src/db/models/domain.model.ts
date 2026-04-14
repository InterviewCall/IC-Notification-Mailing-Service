import { Association, BelongsToManyGetAssociationsMixin, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

import Sender from './sender.model';
import sequelize from './sequelize';

class Domain extends Model<InferAttributes<Domain>, InferCreationAttributes<Domain>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdBy: number;
    declare createdAt: CreationOptional<Date>;

    declare senders?: NonAttribute<Sender[]>;
    declare getSenders: BelongsToManyGetAssociationsMixin<Sender>;

    static associations: {
        senders: Association<Domain, Sender>
    };
}

Domain.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(100),
        unique: {
            name: 'name',
            msg: 'Domain already exists'
        },
        allowNull: false
    },

    createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'domains',
    underscored: true,
    timestamps: false,
    sequelize
});

export default Domain;
