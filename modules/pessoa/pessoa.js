function middleware(permissao) {
    return async (req, res, next) => {
        console.log(req)
        return res.send('teste')
        next();
    }

}
 module.exports = {middleware}
