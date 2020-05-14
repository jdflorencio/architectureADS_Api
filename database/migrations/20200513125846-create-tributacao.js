'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tributacao', {
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
      descricao: {
        allowNull: true,
        type: Sequelize.STRING(30)
      },
      cfop_dentro_estado: {
        allowNull: true,
        type: Sequelize.STRING(4)
      },
      cfop_fora_estado: {
        allowNull: true,
        type: Sequelize.STRING(4)
      },
      aliq_icms_venda_dentro_estado: {
        allowNull: true,
        type: Sequelize.DECIMAL(9, 4)
      },
      aliq_icms_venda_fora_estado: {
        allowNull: true,
        type: Sequelize.DECIMAL(9, 4)
      },
      aliq_icms_reducao_venda: {
        allowNull: true,
        type: Sequelize.DECIMAL(9, 4)
      },
      cst_base_venda: {
        type: Sequelize.STRING(4),
        valueDefault: null
      },
      cst_pis_venda: {
        type: Sequelize.DECIMAL(4, 0),
        valueDefault: 0,
        allowNull: 0
      },
      aliq_pis_venda: {
        type: Sequelize.DECIMAL(9, 4),
        valueDefault: 0,
        allowNull: 0
      },
      cst_cofins_venda: {
        type: Sequelize.STRING(4),
        valueDefault: null
      },
      aliq_cofins_venda: {
        type: Sequelize.DECIMAL(9, 4),
        valueDefault: 0,
        allowNull: 0
      },
      aliq_icms_compra_dentro_estado: {
        type: Sequelize.DECIMAL(9, 4),
        valueDefault: 0,
        allowNull: 0
      },
      aliq_icms_compra_fora_estado: {
        type: Sequelize.DECIMAL(9, 4),
        valueDefault: 0,
        allowNull: 0
      },
      aliq_icms_reducao_compra: {
        type: Sequelize.DECIMAL(9, 4),
        valueDefault: 0,
        allowNull: 0
      },
      cst_base_compra: {
        type: Sequelize.STRING(4),
        valueDefault: null
      },
      cst_pis_compra: {
        type: Sequelize.DECIMAL(4, 0),
        valueDefault: 0,
        allowNull: 0
      },
      aliq_pis_compra: {
        type: Sequelize.DECIMAL(9, 4),
        valueDefault: 0,
        allowNull: 0
      },
      cst_cofins_compra: {
        type: Sequelize.STRING(4),
        valueDefault: null
      },
      aliq_cofins_compra: {
        type: Sequelize.DECIMAL(9, 4),
        valueDefault: 0,
        allowNull: 0
      },
      mva: {
        type: Sequelize.DECIMAL(9, 4),
        valueDefault: 0,
        allowNull: 0
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
    return queryInterface.dropTable('tributacao')
  }
};