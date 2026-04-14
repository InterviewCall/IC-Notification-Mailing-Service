'use strict';

import { QueryInterface } from 'sequelize';

export default {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            ALTER TABLE mail_groups 
            CHANGE COLUMN description 
            description TEXT NULL;
        `);
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            ALTER TABLE mail_groups 
            CHANGE COLUMN description 
            description TEXT NOT NULL;
        `);
    }
};
