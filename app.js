const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express()
const server = require('http').Server(app)
const rotaPessoa = require('./modules/pessoa/pessoa.router')
const rotaGrupo = require('./modules/grupo/grupo.router')
const rotaSubgrupo = require('./modules/subgrupo/subgrupo.router')
const rotaProduto = require('./modules/produto/produto.router') 
const rotaTributacao = require('./modules/tributacao/tributacao.router') 
/* CONFIG */
//app.use(cors())

// Ativar CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  next();
});

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
  
app.use('/api', rotaPessoa)
app.use('/api', rotaGrupo)
app.use('/api', rotaSubgrupo)
app.use('/api', rotaProduto)
app.use('/api', rotaTributacao)

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

module.exports = app;

