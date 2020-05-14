'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
        type: Sequelize.INTEGER,
      },
      role: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING(10)
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_role')
  }
};