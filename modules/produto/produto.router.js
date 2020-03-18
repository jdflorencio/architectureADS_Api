const router = require('express').Router()
const controller = require('./produto.controller')
const mid = require('../../core/permissions')

let permissao = require('../produto/produto.consts').module

router.get('/produtofilter/:data', mid.middleware(permissao.acessar), async (req, res) => { await controller.filter(req, res) })

router.get('/produto', mid.middleware(permissao.acessar), async (req, res) => { await controller.findAll(req, res) })
router.get('/produto/:id', mid.middleware(permissao.acessarId), async (req, res) => { await controller.findOne(req, res) })
router.post('/produto', mid.middleware(permissao.cadastrar), async (req, res) => { await controller.save(req, res) })
router.put('/produto', mid.middleware(permissao.editar), async (req, res) => { await controller.update(req, res) })
router.delete('/produto/:id', mid.middleware(permissao.deletar), async (req, res) => { await controller.delete(req, res) })

module.exports = router