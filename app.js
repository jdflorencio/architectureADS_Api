const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const { ApolloServer, gql } = require('apollo-server-express')

console.log(ApolloServer)
/* const graphql = require('graphql') */
const resolvers = require('./graphQL/resolvers')
const typeDefs  = require('./graphQL/schemas')

const authorization = require('./auth/auth')


const server = new ApolloServer({ typeDefs, resolvers })



const rotaPessoa = require('./modules/pessoa/pessoa.router')
const rotaGrupo = require('./modules/grupo/grupo.router')
const rotaSubgrupo = require('./modules/subgrupo/subgrupo.router')
const rotaProduto = require('./modules/produto/produto.router')
const rotaTributacao = require('./modules/tributacao/tributacao.router')
const rotaNotafiscal = require('./modules/notaFiscal/notaFiscal.router')
const rotaLogin = require('./modules/login/login.router')

/* CONFIG */
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', rotaLogin)

app.use(authorization.readAuthorization)
server.applyMiddleware({ app })

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