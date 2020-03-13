const roleModel = require('../dao/models/user_role.model')
const { Sequelize } = require('../dao/connection')
const Response = require('./response')

let { Op } = Sequelize

function middleware(permissao) {

    return async (req, res, next) => {
        const {permissoes, usuarioId} = req

        const role = await roleModel.findAll({ where: {
            [Op.and]: [
                {
                    userId: req.credenciais.usuarioId
                },
                {
                    role: permissao
                }
            ]
        }})
        
        if ( role.length < 1 ) {
           new Response(res).forbidden()
           return
        }
        next()
    }
}
 module.exports = {middleware}