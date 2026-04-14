import { QueryInterface } from 'sequelize';

export default {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            CREATE TABLE IF NOT EXISTS senders (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                address VARCHAR(100) NOT NULL,
                domain_id INT UNSIGNED NOT NULL,
                FOREIGN KEY (domain_id) REFERENCES domains(id)
            );
        `);
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            DROP TABLE IF EXISTS senders;
        `);
    }
};
