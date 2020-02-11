const router = require('express').Router()
const controller = require('./notaFiscal.controller')

router.get('/notafiscal', async (req, res) => { await controller.findAll(req, res) })
router.get('/notafiscal/:id', async (req, res) => { await controller.findOne(req, res) })
router.post('/notafiscal', async (req, res) => { await controller.save(req, res) })
router.put('/notafiscal', async (req, res) => { await controller.update(req, res) })
router.delete('/notafiscal/:id', async (req, res) => { await controller.delete(req, res) })

module.exports = router