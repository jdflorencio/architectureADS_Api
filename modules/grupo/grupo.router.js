const router = require('express').Router()
const controller = require('./grupo.controller')

router.get('/grupo', async (req, res) => { await controller.findAll(req, res) })
router.get('/grupo/:id', async (req, res) => { await controller.findOne(req, res) })
router.post('/grupo', async (req, res) => { await controller.save(req, res) })
router.put('/grupo', async (req, res) => { await controller.update(req, res) })
router.delete('/grupo/:id', async (req, res) => { await controller.delete(req, res) })

module.exports = router