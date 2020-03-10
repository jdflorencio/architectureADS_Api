const jwt = require('jsonwebtoken')
const Response = require('../core/response')

function readAuthorization(req, res, next) {
    const bearerHeader = req.headers.authorization
    if (typeof bearerHeader === 'undefined') {
        new Response(res).unauthorized()
        return;
    }
    
    req.token = bearerHeader.split(' ')[1]
    
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async function(
        err,
        decodedToken
    ){
        if (err) {
            if (err.name === 'tokenExpiredError') {
                new Response(res).unauthorized('Sua Sessão Expirou!')
            } else {
                new Response(res).unauthorized()
            }
            return
        }
        req.credenciais = decodedToken
        const usuario = 10

        if (!usuario) {
            new Response(res).unauthorized()
            return
        }

        req.credenciais.usuario = usuario
        next()

    } )
}


async function login(req, res) {

    console.log(req.body)
    let {usuario, senha} = req.body
    const usuarioExemplo = 'user@test.com'
    const senhaExemplo = 123456
    
    loginValido = usuario === usuarioExemplo && senha === senhaExemplo

    console.log(loginValido)
    
    if (!loginValido) {
        new Response(res).unauthorized()
        return
    }

    let loginData = {
        usuarioId: 10,
        usuarioEmail: usuarioExemplo
    }

    jwt.sign(loginData, process.env.JWT_SECRET_KEY, async function(err, token) {
        if (err) {
            return new Response(res).preConditionFailed()
        }

        new Response(res).success(token)
    })
}

module.exports = {
    readAuthorization,
    login
}