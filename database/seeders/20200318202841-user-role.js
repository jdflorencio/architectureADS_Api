'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_role', [
      // CLIENTES
      {
        userId: 1,
        role: "CLI010"
      },
      {
        userId: 1,
        role: "CLI020"
      },
      {
        userId: 1,
        role: "CLI011"
      },
      {
        userId: 1,
        role: "CLI030"
      },
      {
        userId: 1,
        role: "CLI040"
      },
      //PRODUTOS
      {
        userId: 1,
        role: "PROD010"
      },
      {
        userId: 1,
        role: "PROD011"
      },
      {
        userId: 1,
        role: "PROD020"
      },
      {
        userId: 1,
        role: "PROD030"
      },
      {
        userId: 1,
        role: "PROD040"
      },
      // TRIBUTACAO
      {
        userId: 1,
        role: "TRIBUT010"
      },
      {
        userId: 1,
        role: "TRIBUT011"
      },
      {
        userId: 1,
        role: "TRIBUT020"
      },
      {
        userId: 1,
        role: "TRIBUT030"
      },
      {
        userId: 1,
        role: "TRIBUT040"
      },
      // GRUPO
      {
        userId: 1,
        role: "GRUP010"
      },
      {
        userId: 1,
        role: "GRUP011"
      },
      {
        userId: 1,
        role: "GRUP020"
      },
      {
        userId: 1,
        role: "GRUP030"
      },
      {
        userId: 1,
        role: "GRUP040"
      },
      // SUBGRUPO
      {
        userId: 1,
        role: "SUBGRUP010"
      },
      {
        userId: 1,
        role: "SUBGRUP011"
      },
      {
        userId: 1,
        role: "SUBGRUP020"
      },
      {
        userId: 1,
        role: "SUBGRUP030"
      },
      {
        userId: 1,
        role: "SUBGRUP040"
      },
      {
        userId: 1,
        role: "SUBGRUP040"
      },
      // NOTA FISCAL
      {
        userId: 1,
        role: "NOTA010"
      },
      {
        userId: 1,
        role: "NOTA011"
      },
      {
        userId: 1,
        role: "NOTA020"
      },
      {
        userId: 1,
        role: "NOTA030"
      },
      {
        userId: 1,
        role: "NOTA040"
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_role')
  }
};