const router = require('express').Router()
const controller = require('./grupo.controller')
const mid = require('.././../core/permissions')
let permissao = require('./grupo.consts').module

router.get('/grupo', mid.middleware(permissao.acessar),async (req, res) => { await controller.findAll(req, res)})
router.get('/grupo/:id', mid.middleware(permissao.acessarId),async (req, res) => { await controller.findOne(req, res)})
router.post('/grupo', mid.middleware(permissao.cadastrar),async (req, res) => { await controller.save(req, res) })
router.put('/grupo', mid.middleware(permissao.editar),async (req, res) => { await controller.update(req, res) })
router.delete('/grupo/:id', mid.middleware(permissao.deletar),async (req, res) => { await controller.delete(req, res)})

module.exports = router