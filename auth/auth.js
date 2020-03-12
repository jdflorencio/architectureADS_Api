const jwt = require('jsonwebtoken')
const Response = require('../core/response')
const userModel = require('../dao/models/user.model')
const roleModel = require('../dao/models/user_role.model')
// const bcrypt = require('bcrypt');

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
        const usuario = decodedToken.usuarioId

        if (!usuario) {
            new Response(res).unauthorized()
            return
        }
        // req.credenciais.usuario = usuario
        next()

    } )
}

async function login(req, res) {
    let {usuario, senha} = req.body

    const user = await userModel.findOne({
        include : {
            model : roleModel,
            attributes: ["role"]
        },
        where: {
            email: usuario,
            
        }
    })

    if (!user) {
        new Response(res).unauthorized()
        return
    }

    loginValido = senha === user.password

    if (!loginValido) {
        new Response(res).unauthorized()
        return
    }

    let loginData = {
        usuarioId: user.id,
        usuarioEmail: user.email,
        permissoes: [user.user_role],
        expiresIn : Math.floor(Date.now() / 1000) + (60)
        // exp: 70000 * 1000
        // exp: Math.floor(Date.now() / 1000) + (60)
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