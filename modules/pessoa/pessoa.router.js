const router = require('express').Router()
const controller = require('./pessoa.controller')
const mid = require('./pessoa');
let permissao= 'CLI010'
router.get('/clientefilter/:data', async (req, res) => { await controller.filter(req, res) })

router.get('/cliente', mid.middleware(permissao), async (req, res) => { await controller.findAll(req, res) })
router.get('/cliente/:id', async (req, res) => { await controller.findOne(req, res) })
router.post('/cliente', async (req, res) => { await controller.save(req, res) })
router.put('/cliente', async (req, res) => { await controller.update(req, res) })
router.delete('/cliente/:id', async (req, res) => { await controller.delete(req, res) })

module.exports = router