'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('nota', {
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
      numero: {
        type: Sequelize.INTEGER,
        valueDefault: 0
      },
      chave_nfe: {
        type: Sequelize.STRING,
        valueDefault: null
      },
      data_emissao: {
        type: Sequelize.DATE
      },
      data_entrada: {
        type: Sequelize.DATE
      },
      valor_desconto: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      valor_acrecismo: {
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
      tipo: {
        type: Sequelize.ENUM('ENTRADA', 'SAIDA'),
        valueDefault: null
      },
      base_icms: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      valor_icms: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      base_subst: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      base_ipi: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      valor_ipi: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      valor_frete: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      valor_outros: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
      },
      valor_seguro: {
        type: Sequelize.DECIMAL(12, 4),
        valueDefault: 0
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
    return queryInterface.dropTable('nota')

  }
};