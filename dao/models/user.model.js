'use strict';

const { Sequelize, connection } = require('../connection')
const Model = Sequelize.Model

class User extends Model { }
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
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
  tableName: 'user',
  freezeTableName: true,
  timestamps: false,
  name: {
    singular: 'user',
    plural: 'user'
  },
  underscored: false
})

module.exports = User;