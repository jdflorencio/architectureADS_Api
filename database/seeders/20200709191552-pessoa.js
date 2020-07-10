'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('pessoa', [
      {
        tipo: 'pf',
        nome: "Juan Henry Bento Melo",
        sexo: "Masculino",
        userId: 1,
        nome_fantasia: "",
        data_nascimento: new Date(),
        data_fundacao: new Date(),
        nacionalidade: "Brasileiro",
        estado_civil: "Solteiro",
        rg: "17.165.264-2",
        cpf_cnpj: "011.896.698-70",
        inscricao_estadual: "1234566548798",
        email:"teste@florencio.com",
        log_criacao:  new Date(),
        log_atualizacao:  new Date(),
        log_pct_usuario: "1"
      }

      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pessoa', null, {});
  
  }
};
