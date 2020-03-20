'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pessoa', {
      id: 1,
      userId: 1,
      tipo: 'pf',
      nome: "Nicolas Raimundo Pedro Aparício",
      sexo: "MASCULINO",
      nome_fantasia: "",
      data_nascimento: "",
      data_fundacao: "",
      nacionalidade: "BRASILEIRO",
      estado_civil: "SOLTEIRO",
      rg: "370365185",
      cpf_cnpj: "42498760555",
      inscricao_estadual: "",
      email: "nicolas@seed.com.br"
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pessoa')
  }
};
