'use strict';

const {Sequelize ,connection} = require('../connection')
const Model = Sequelize.Model

class PessoaEndereco extends Model {}
PessoaEndereco.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  endereco : {
    type: Sequelize.STRING,
    allowNull: true
  },
  bairro : {
    type: Sequelize.STRING,
    allowNull: true
  },
  numero : {
    type: Sequelize.STRING,
    allowNull: true,
  },
  complemento: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  cidade: {
    type: Sequelize.STRING,
    allowNull: true
  },
  uf: {
    type: Sequelize.STRING,
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

  console.log('ENDERECOS ',PessoaEndereco === connection.models.PessoaEndereco)
  module.exports = PessoaEndereco;