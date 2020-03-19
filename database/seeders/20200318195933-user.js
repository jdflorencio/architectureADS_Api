'use strict';

const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      id: 1,
      name: "João Diego",
      email: "joaodiego@gmail.com",
      password: bcrypt.hashSync('123456', saltRounds)
    },
    {
      id: 2,
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
