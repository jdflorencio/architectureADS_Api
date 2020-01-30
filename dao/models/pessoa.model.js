'use strict';

const {Sequelize, DataTypes ,connection} = require('../connection')
const Model = Sequelize.Model
const Telefone = require('./telefone.model')
const Endereco = require('./endereco.model')

class Pessoa extends Model {}
Pessoa.init({  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true
  },  
  tipo: {
    type: DataTypes.ENUM,
    values: ['pf', 'pj']
    },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nome_fantasia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // infor pessoas
  data_nascimento: {
    type: DataTypes.DATEONLY
  },
  data_fundacao: DataTypes.DATEONLY,
  nacionalidade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado_civil: DataTypes.STRING,
  rg: DataTypes.STRING,
  cpf_cnpj: DataTypes.STRING,
  inscricao_estadual: DataTypes.STRING, 
  //  contato
  email : {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: DataTypes.DATE
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
