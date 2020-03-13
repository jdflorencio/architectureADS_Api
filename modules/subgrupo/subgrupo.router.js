const router = require('express').Router()
const controller = require('./subgrupo.controller')
const mid = require('../../core/permissions')
const permissao = require('./subgrupo.consts').module

router.get('/subgrupo', mid.middleware(permissao.acessar), async (req, res) => { await controller.findAll(req, res) })
router.get('/subgrupo/:id', mid.middleware(permissao.acessarId), async (req, res) => { await controller.findOne(req, res) })
router.post('/subgrupo', mid.middleware(permissao.cadastrar), async (req, res) => { await controller.save(req, res) })
router.put('/subgrupo', mid.middleware(permissao.editar), async (req, res) => { await controller.update(req, res) })
router.delete('/subgrupo/:id', mid.middleware(permissao.deletar), async (req, res) => { await controller.delete(req, res) })

module.exports = router