'use strict';

const { Sequelize, connection } = require('../connection')
const Model = Sequelize.Model

class UserRole extends Model { }
UserRole.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  role: {
    type: Sequelize.STRING,
    allowNull: true
  },
}, {
  sequelize: connection,
  tableName: 'user_role',
  freezeTableName: true,
  timestamps: false,
  name: {
    singular: 'user_role',
    plural: 'user_role'
  },
  underscored: false
})

module.exports = UserRole;