'use strict';

import { QueryInterface } from 'sequelize';

export default {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            CREATE TABLE IF NOT EXISTS roles (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL UNIQUE
            );
        `);
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            DROP TABLE IF EXISTS roles;
        `);
    }
};
