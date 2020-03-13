const router = require('express').Router()
const controller = require('./tributacao.controller')
const mid = require('../../core/permissions')

let permissao = require('./tributacao.consts').role

router.get('/tributacao', mid.middleware(permissao.acessar), async (req, res) => { await controller.findAll(req, res) })
router.get('/tributacao/:id', mid.middleware(permissao.acessarId), async (req, res) => { await controller.findOne(req, res) })
router.post('/tributacao', mid.middleware(permissao.cadastrar), async (req, res) => { await controller.save(req, res) })
router.put('/tributacao', mid.middleware(permissao.editar), async (req, res) => { await controller.update(req, res) })
router.delete('/tributacao/:id', mid.middleware(permissao.deletar), async (req, res) => { await controller.delete(req, res) })

module.exports = router