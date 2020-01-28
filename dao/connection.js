'use strict';

const {Sequelize, DataTypes} = require('sequelize');

const config = {
    "username": "root",
    "password": "123",
    "database": "simpleERP",
    "host": "172.24.0.2",
    "dialect": "mysql",
    "timezone": "-03:00"
 }

let connection = new Sequelize(config.database, config.username, config.password, config)

module.exports = {
  connection,
  DataTypes,
  Sequelize
}
