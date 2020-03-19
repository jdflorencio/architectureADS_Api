const router = require('express').Router()
const controller = require('./notaFiscal.controller')
const mid = require('../../core/permissions')

let permissao = require('../notaFiscal/notaFiscal.consts')

router.get('/notafiscal', mid.middleware(permissao.acessar),async (req, res) => { await controller.findAll(req, res) })
router.get('/notafiscal/:id', mid.middleware(permissao.acessarId),async (req, res) => { await controller.findOne(req, res) })
router.post('/notafiscal', mid.middleware(permissao.cadastrar),async (req, res) => { await controller.save(req, res) })
router.put('/notafiscal', mid.middleware(permissao.editar),async (req, res) => { await controller.update(req, res) })
router.delete('/notafiscal/:id', mid.middleware(permissao.deletar),async (req, res) => { await controller.delete(req, res) })

module.exports = router