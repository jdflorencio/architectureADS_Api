'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('telefone', [{
        userId: 1,
        pessoaId: 1,
        telefone: "7332911112",
        tipo: "",
        log_criacao:  new Date(),
        log_atualizacao:  new Date(),
        log_pct_usuario: "1"
      },
      {
        userId: 1,
        pessoaId: 1,
        telefone: "7332911113",
        tipo: "",
        log_criacao:  new Date(),
        log_atualizacao:  new Date(),
        log_pct_usuario: "1"
      },
      {
          userId: 1,
          pessoaId: 1,
          telefone: "7332911114",
          tipo: "",
          log_criacao:  new Date(),
          log_atualizacao:  new Date(),
          log_pct_usuario: "1"
        }
    
    ], {});

  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkDelete('telefone');
    
  }
};
