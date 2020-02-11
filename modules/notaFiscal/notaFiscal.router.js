const router = require('express').Router()
const controller = require('./notaFiscal.controller')

router.get('/notaFiscal', async (req, res) => { await controller.findAll(req, res) })
router.get('/notaFiscal/:id', async (req, res) => { await controller.findOne(req, res) })
router.post('/notaFiscal', async (req, res) => { await controller.save(req, res) })
router.put('/notaFiscal', async (req, res) => { await controller.update(req, res) })
router.delete('/notaFiscal/:id', async (req, res) => { await controller.delete(req, res) })

module.exports = router