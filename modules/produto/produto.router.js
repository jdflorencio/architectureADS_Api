const router = require('express').Router()
const controller = require('./produto.controller')

router.get('/produto', async (req, res) => { await controller.findAll(req, res) })
router.get('/produto/:id', async (req, res) => { await controller.findOne(req, res) })
router.post('/produto', async (req, res) => { await controller.save(req, res) })
router.put('/produto', async (req, res) => { await controller.update(req, res) })
router.delete('/produto/:id', async (req, res) => { await controller.delete(req, res) })

module.exports = router