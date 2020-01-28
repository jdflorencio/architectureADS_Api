const rota = require('express').Router();
const pessoaController = require('../modules/pessoa/pessoa.controller')
//routes.use(verify)

rota.get('/cliente', pessoaController.findAll)
rota.get('/cliente/:id', pessoaController.findOne)
rota.post('/cliente' ,pessoaController.save)
rota.put('/cliente', pessoaController.update)
rota.delete('/cliente/:id', pessoaController.delete)

module.exports =  rota
