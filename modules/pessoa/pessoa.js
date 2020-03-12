const role = require('./pessoa.consts')

function middleware(permissao) {
    return async (req, res, next) => {
        console.log(req)
        
        next();
    }

}
 module.exports = {middleware}
