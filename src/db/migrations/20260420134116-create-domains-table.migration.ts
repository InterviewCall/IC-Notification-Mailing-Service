import { QueryInterface } from 'sequelize';

export default {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            CREATE TABLE IF NOT EXISTS domains (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                domain VARCHAR(255) NOT NULL UNIQUE,
                identity_type VARCHAR(20) NOT NULL DEFAULT 'DOMAIN',
                verification_status VARCHAR(50) NULL,
                dkim_status VARCHAR(50) NULL,
                dkim_signing_attributes_origin VARCHAR(50) NULL,
                is_verified TINYINT(1) NOT NULL DEFAULT 0,
                created_by INT UNSIGNED NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL DEFAULT NULL
            );
        `);
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            DROP TABLE IF EXISTS domains;
        `);
    }
};
