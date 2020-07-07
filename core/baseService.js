const { Sequelize, connection } = require('../dao/connection')
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

    async save(payload, credenciais) {

        const transaction = await connection.transaction({
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })

        try {
            let validPayload = helper.IsvalidCreate(payload)
            if (validPayload.error) {
                return Promise.reject({
                    message: "Dados de entrada invalidos, verifique os campos obrigatorios", 
                    error: validPayload.error.msg
                })
            }
        }
        
    }
}

module.exports = BaseService
