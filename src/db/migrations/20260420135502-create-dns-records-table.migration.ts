import { QueryInterface } from 'sequelize';

export default {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            CREATE TABLE IF NOT EXISTS dns_records (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                domain_id INT UNSIGNED NOT NULL,
                type VARCHAR(20) NOT NULL,
                host VARCHAR(255) NOT NULL,
                value VARCHAR(255) NOT NULL,
                purpose VARCHAR(50) NOT NULL DEFAULT 'DKIM',
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                CONSTRAINT fk_dns_records_domain
                FOREIGN KEY (domain_id) REFERENCES domains(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            );
        `);
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            DROP TABLE IF EXISTS dns_records;
        `);
    }
};
