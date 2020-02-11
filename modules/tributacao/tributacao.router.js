const router = require('express').Router()
const controller = require('./tributacao.controller')

router.get('/tributacao', async (req, res) => { await controller.findAll(req, res) })
router.get('/tributacao/:id', async (req, res) => { await controller.findOne(req, res) })
router.post('/tributacao', async (req, res) => { await controller.save(req, res) })
router.put('/tributacao', async (req, res) => { await controller.update(req, res) })
router.delete('/tributacao/:id', async (req, res) => { await controller.delete(req, res) })

module.exports = router