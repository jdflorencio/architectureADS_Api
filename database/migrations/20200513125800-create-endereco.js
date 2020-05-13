'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('endereco', {
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
      endereco: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      bairro: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING(60)
      },
      numero: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.STRING(10)
      },
      complemento: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING(255)
      },
      cidade: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING(60)
      },
      uf: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING(2)
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
    return queryInterface.dropTable('endereco')
  }
};