'use strict';

const {Sequelize, DataTypes ,connection} = require('../connection')
const Model = Sequelize.Model

class PessoaEndereco extends Model {}
PessoaEndereco.init({  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  endereco : {
    type: DataTypes.STRING,
    allowNull: true
  },
  bairro : {
    type: DataTypes.STRING,
    allowNull: true
  },
  numero : {
    type: DataTypes.STRING,
    allowNull: true,
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  uf: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize: connection,
  tableName: 'endereco',
  freezeTableName : true,
  timestamps : false,
  name:{
          singular:'endereco',
          plural: 'enderecos'
  },
  underscored : false
  })

  module.exports = PessoaEndereco;