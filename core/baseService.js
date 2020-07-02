const Promise   = require('bluebird')
const coreConst = require('./coreConsts')
class BaseService {
    constructor(model, helper) {
        
        this.requireEmpresa = true

        this.helper = helper
        this._model= model
    }

    model(credenciais) {
        if (this.requireEmpresa) {
            return this._model.scope({method: [coreConst.TENANT_SCOPE, credenciais.usuarioId ]})
        }
    
        return this._model
    }

    async findAll(filter, credenciais) {
        return await this.model(credenciais).findAll(filter)
    }
}

module.exports = BaseService
