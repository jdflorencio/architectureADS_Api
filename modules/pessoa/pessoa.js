const roleModel = require('../../dao/models/user_role.model')
const role = require('./pessoa.consts')

function middleware(permissao) {

    return async (req, res, next) => {
        const {permissoes} = req
        const role = roleModel.findByPk()     
        next();
    }
}
 module.exports = {middleware}