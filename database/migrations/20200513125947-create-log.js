'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('log', {
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
      acao: {
        type: Sequelize.ENUM('CADASTRAR', 'EDITAR', 'ATUALIZAR', 'DELETAR'),
      },
      registro: {
        type: Sequelize.STRING(50)
      },
      log_atualizacao: {
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('log')
  }
};