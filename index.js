const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const server = require('http').Server(app)
const rotas = require('./rotas/rota')

/* CONFIG */
app.use(cors())

// parse application/json
app.use(bodyParser.json())

app.use('/api', rotas)

// PARA ROTAS NÃO EXISTENTE
app.use((req, res, next) => {
  const erro = new Error('Não encontrado')  
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

server.listen(3333);