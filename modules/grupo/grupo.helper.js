const Joi = require('@hapi/joi')

const grupoSchema = {
	id              : Joi.number().integer().min(1),
	descricao       : Joi.string().min(1).max(60),
}

class GrupoHelper {

    constructor() {
      this.schema = grupoSchema;
    }

    isValidCreate(payload) {
        delete this.schema.id
        const schema = Joi.object().keys(this.schema);
        const result = schema.validate(payload, {allowUnknown : true, stripUnknown : true})
        return this.resetJoiErrorMessage(result)          
    }

    isValidUpdate(payload) {
        this.schema.id = Joi.number().integer().required();

        const schema = Joi.object().keys(this.schema);
        const result = schema.validate(payload, {allowUnknown : true});
        return this.resetJoiErrorMessage(result)           
    }

    resetJoiErrorMessage(joiResult) {

      if (joiResult.error) {
        const erro = [];
        if (joiResult.error.details && joiResult.error.details.length > 0) {
          joiResult.error.details.map(function(e) {
            erro.push(e.message);
          });
          joiResult.error.msg = erro;
          
        }
      }
      return joiResult
    }
}

let grupoHelper = new GrupoHelper();
module.exports   = grupoHelper;