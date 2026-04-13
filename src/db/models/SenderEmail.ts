import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import Domain from './Domain';
import sequelize from './sequelize';

class SenderEmail extends Model<InferAttributes<SenderEmail>, InferCreationAttributes<SenderEmail>> {
    declare id: number;
    declare name: string;
    declare domainId: ForeignKey<Domain['id']>;
}

SenderEmail.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    domainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Domain,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'sender_emails',
    underscored: true,
    timestamps: false,
    sequelize
});

export default SenderEmail;
