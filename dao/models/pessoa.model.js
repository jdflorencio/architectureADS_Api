
'use strict';

const { Sequelize, connection } = require('../connection')
const Model = Sequelize.Model
const Telefone = require('./telefone.model')
const Endereco = require('./endereco.model')
const Nota = require('./nota.model')

class Pessoa extends Model { }
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
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  log_criacao: {
    type: Sequelize.DATE
  },
  log_atualizacao: {
    type: Sequelize.DATE
  },
  log_pct_usuario: {
    type: Sequelize.INTEGER
  }
}, {
  sequelize: connection,
  tableName: 'pessoa',
  freezeTableName: true,
  timestamps: false,
  name: {
    singular: 'pessoa',
    plural: 'pessoas'
  },
  underscored: false
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

Pessoa.hasMany(Nota, {
  foreignKey: "id",
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
})

Nota.belongsTo(Pessoa)

module.exports = Pessoa