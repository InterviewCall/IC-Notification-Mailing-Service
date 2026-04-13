import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from './sequelize';

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id: number;
    declare name: string;
}

Role.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(50),
        unique: {
            name: 'role_name',
            msg: 'Role name already exists'
        },
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Role name is required'
            }
        }
    }
}, {
    tableName: 'roles',
    underscored: true,
    timestamps: false,
    sequelize
});

export default Role;
