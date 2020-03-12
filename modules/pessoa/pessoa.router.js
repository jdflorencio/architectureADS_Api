const router = require('express').Router()
const controller = require('./pessoa.controller')
const mid = require('./pessoa');
let permissao = require('./pessoa.consts')
router.get('/clientefilter/:data', async (req, res) => { await controller.filter(req, res) })

router.get('/cliente',  mid.middleware(permissao.acessar),async (req, res) => { await controller.findAll(req, res) })
router.get('/cliente/:id', mid.middleware(permissao.acessar),async (req, res) => { await controller.findOne(req, res) })
router.post('/cliente', mid.middleware(permissao.cadastrar),async (req, res) => { await controller.save(req, res) })
router.put('/cliente', mid.middleware(permissao.editar),async (req, res) => { await controller.update(req, res) })
router.delete('/cliente/:id', mid.middleware(permissao.deletar) ,async (req, res) => { await controller.delete(req, res) })

module.exports = router