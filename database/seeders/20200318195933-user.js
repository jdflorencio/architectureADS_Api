'use strict';

const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      name: "João Diego",
      email: "joaodiego@gmail.com",
      password: bcrypt.hashSync('123456', saltRounds)
    },
    {
      name: "Teste",
      email: "teste@gmail.com",
      password: bcrypt.hashSync('123456', saltRounds)
    }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user')

  }
};
