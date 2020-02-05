'use strict';

const {Sequelize ,connection} = require('../connection')
const Model = Sequelize.Model
const Telefone = require('./telefone.model')
const Endereco = require('./endereco.model')

class Pessoa extends Model {}
Pessoa.init({  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, 
    autoIncrement: true
  },  
  tipo: {
    type: Sequelize.ENUM,
    values: ['pf', 'pj']
    },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sexo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nome_fantasia: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // infor pessoas
  data_nascimento: {
    type: Sequelize.DATEONLY
  },
  data_fundacao: Sequelize.DATEONLY,
  nacionalidade: {
    type: Sequelize.STRING,
    allowNull: true
  },
  estado_civil: Sequelize.STRING,
  rg: Sequelize.STRING,
  cpf_cnpj: Sequelize.STRING,
  inscricao_estadual: Sequelize.STRING, 
  //  contato
  email : {
    type: Sequelize.STRING,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: Sequelize.DATE
},{
    sequelize: connection,
    modelName: 'pessoa',
		tableName: 'pessoa',
		freezeTableName : true,
		timestamps : false,
		name:{
      singular:'pessoa',
      plural: 'pessoas'
		},
		underscored : false
    });

    Pessoa.hasMany(Endereco, {
        foreignKey: 'pessoaId',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });
    
    Pessoa.hasMany(Telefone, {
        foreignKey: 'pessoaId',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });
module.exports = Pessoa;    
