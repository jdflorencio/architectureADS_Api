const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const path = require('path')
const authorization = require('./auth/auth')

const { ApolloServer } = require('apollo-server-express')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')

const rotaPessoa = require('./modules/pessoa/pessoa.router')
const rotaGrupo = require('./modules/grupo/grupo.router')
const rotaSubgrupo = require('./modules/subgrupo/subgrupo.router')
const rotaProduto = require('./modules/produto/produto.router')
const rotaTributacao = require('./modules/tributacao/tributacao.router')
const rotaNotafiscal = require('./modules/notaFiscal/notaFiscal.router')
const rotaLogin = require('./modules/login/login.router')

function carregaTodos(padraoBusca) {
  return loadFilesSync(path.join(__dirname, padraoBusca))    
}

const definicoesTipos =  carregaTodos('./modules/**/*.graphql')
const resolvers =  carregaTodos('./modules/**/*.resolvers.js')

/* CONFIG */
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', rotaLogin)
app.use(authorization.readAuthorization)

const apolloServer = new ApolloServer({
  typeDefs: mergeTypeDefs(definicoesTipos, { all: true }),
  resolvers: mergeResolvers(resolvers, { all: true }), 

  context: ({req}) =>{
    const credenciais = req.credenciais

    return {credenciais}
  }
})
  
apolloServer.applyMiddleware({ app })

app.use('/api', rotaPessoa)
app.use('/api', rotaGrupo)
app.use('/api', rotaSubgrupo)
app.use('/api', rotaProduto)
app.use('/api', rotaTributacao)
app.use('/api', rotaNotafiscal)

// PARA ROTAS NÃO EXISTENTE
app.use((req, res, next) => {
  const erro = new Error('Rota não encontrada')  
  erro.status = 404
  next(erro)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  return res.send({
    erro: {
      msg: error.message
    }
  })
})





module.exports = app