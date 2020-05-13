
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pessoa', {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false, 
        references: {
          model:'user',
          key: 'id'
        },
        type: Sequelize.INTEGER, 
      },
      tipo: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['pf', 'pj']
      },
      nome: {
        allowNull: true,
        type: Sequelize.STRING(60)
      },
      sexo: {
        allowNull: true,
        type: Sequelize.STRING(9)
      },
      nome_fantasia: {
        allowNull: true,
        type: Sequelize.STRING(60),
      },
      // infor pessoas
      data_nascimento: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      data_fundacao: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      nacionalidade: {
        allowNull: true,
        type: Sequelize.STRING(30)
      },
      estado_civil: {
        allowNull: true,
        type: Sequelize.STRING(15)
      },
      rg: {
        allowNull: true,
        type: Sequelize.STRING(15)
      },
      cpf_cnpj: {
        allowNull: false,
        type: Sequelize.STRING(14)
      },
      inscricao_estadual: {
        allowNull: true,
        type: Sequelize.STRING(15)
      },
      email : {
        allowNull: true,
        type: Sequelize.STRING(100)
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
    return queryInterface.dropTable('pessoa')
  }
};
