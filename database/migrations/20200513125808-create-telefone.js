'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('telefone', {
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
      pessoaId: {
        allowNull: false,
        references: {
          model: 'pessoa',
          key: 'id'
        },
        type: Sequelize.INTEGER,
      },
      telefone: {
        allowNull: false,
        defaultValue: null,
        type: Sequelize.STRING(255)
      },
      tipo: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      log_criacao: {
        allowNull: false,
        type: Sequelize.DATE
      },
      log_atualizacao: {
        allowNull: false,
        type: Sequelize.DATE
      },
      log_pct_usuario: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('telefone')
  }
};