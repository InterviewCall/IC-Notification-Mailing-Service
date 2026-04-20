import { QueryInterface } from 'sequelize';

export default {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
        ALTER TABLE mail_contacts
        ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
      `);
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
        ALTER TABLE mail_contacts
        DROP COLUMN updated_at;
      `);
    }
};
