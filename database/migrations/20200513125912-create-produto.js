'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produto', {
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
      referencia: {
        type: Sequelize.INTEGER,
        valueDefault: 0,
        allowNull: true
      },
      grupoId: {
        type: Sequelize.INTEGER,
        valueDefault: 0,
        allowNull: true
      },
      subgrupoId: {
        type: Sequelize.INTEGER,
        valueDefault: 0,
        allowNull: true
      },
      tributacaoId: {
        type: Sequelize.INTEGER,
        valueDefault: 0,
        allowNull: true
      },
      refencia: {
        type: Sequelize.STRING(30),
        valueDefault: null,
        allowNull: true
      },
      descricao: {
        type: Sequelize.STRING(60),
        valueDefault: null,
        allowNull: true
      },
      codigo_ean: {
        type: Sequelize.STRING(13),
        valueDefault: null,
        allowNull: true
      },
      estoque_atual: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0,
        allowNull: false
      },
      estoque_minimo: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0,
        allowNull: false
      },
      estoque_maximo: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0,
        allowNull: false
      },
      vl_custo: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0,
        allowNull: false
      },
      vl_venda: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0,
        allowNull: false
      },
      ncm: {
        type: Sequelize.STRING(10),
        valueDefault: null,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('ATIVO', 'INATIVO'),
        valueDefault: 0,
        allowNull: true
      },
      fabricante: {
        type: Sequelize.STRING(60),
        valueDefault: null,
        allowNull: true
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
    return queryInterface.dropTable('produto')
  }
};