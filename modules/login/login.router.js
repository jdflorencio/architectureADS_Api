const router = require('express').Router()
const login  = require('../../auth/auth')

router.post('/login', async (req, res ) => {login.login(req, res)})

module.exports = router