const router = require('express').Router()
const controller = require('./subgrupo.controller')
const authorization  = require('../../auth/auth')



router.get('/subgrupo', async (req, res) => { await controller.findAll(req, res) })
router.get('/subgrupo/:id', async (req, res) => { await controller.findOne(req, res) })
router.post('/subgrupo', async (req, res) => { await controller.save(req, res) })
router.put('/subgrupo', async (req, res) => { await controller.update(req, res) })
router.delete('/subgrupo/:id', async (req, res) => { await controller.delete(req, res) })

module.exports = router