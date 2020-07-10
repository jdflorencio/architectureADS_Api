const PessoaService = require('./pessoa.service')
let permissao = require('./pessoa.consts').module
const mid = require('./pessoa');

const resolvers = {
    Query: {
      pessoas: (_, arqs, {credenciais}) => {
        mid.middleware(permissao.acessar)       
        return PessoaService.findAll(credenciais)
      },

      pessoa: (_, {id}, {credenciais}) => {
        return PessoaService.findById(id)

      }
    /*   users: () => users,
      user: () => users[0 ]*/
    }  
  }

  module.exports = resolvers