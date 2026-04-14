import { QueryInterface } from 'sequelize';

export default {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            CREATE TABLE IF NOT EXISTS mail_group_contacts (
                group_id BIGINT UNSIGNED NOT NULL,
                contact_id BIGINT UNSIGNED NOT NULL,
                PRIMARY KEY (group_id, contact_id),
                FOREIGN KEY (group_id) REFERENCES mail_groups(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (contact_id) REFERENCES mail_contacts(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
        `);
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            DROP TABLE IF EXISTS mail_group_contacts;
        `);
    }
};
