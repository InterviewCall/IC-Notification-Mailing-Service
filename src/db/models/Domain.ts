import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from './sequelize';

class Domain extends Model<InferAttributes<Domain>, InferCreationAttributes<Domain>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdBy: number;
    declare createdAt: CreationOptional<Date>;
}

Domain.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },

    createdBy: {
        type: DataTypes.INTEGER,
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
