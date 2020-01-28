const rota = require('express').Router();
const pessoaController = require('../modules/pessoa/pessoa.controller')
//routes.use(verify)

rota.get('/', pessoaController.findAll)
rota.get('/:idCliente', pessoaController.findOne)
rota.post('/' ,pessoaController.save)
rota.put('/', pessoaController.update)
rota.delete('/:idCliente', pessoaController.delete)

module.exports =  rota
