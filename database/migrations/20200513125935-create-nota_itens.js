'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('nota_itens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      notaId: {
        allowNull: false,
        references: {
          model: 'nota',
          key: 'id'
        },
        type: Sequelize.INTEGER,
      },
      produtoId: {
        allowNull: false,
        references: {
          model: 'produto',
          key: 'id'
        },
        type: Sequelize.INTEGER,
      },
      cfop: {
        type: Sequelize.STRING(4),
        valueDefault: null
      },
      cst: {
        type: Sequelize.STRING(4),
        valueDefault: null
      },
      quantidade: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      valor: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      desconto: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      acrescimo: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      subtotal: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      total: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      aliq_icms: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      base_icms: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      valor_icms: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      aliq_subst: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      base_subst: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      aliq_ipi: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      base_ipi: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('nota_itens')
  }
};