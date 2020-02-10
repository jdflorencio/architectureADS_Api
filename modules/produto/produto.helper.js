const Joi = require('@hapi/joi')


const produtoSchema = {   
  
    //id                  : Joi.number().integer().min(1),
    nome                : Joi.string().min(3).max(60).required(),
    nascimento          : Joi.date().iso(),
    cpf_cnpj            : Joi.string().min(14).max(60).required(),
    data_fundacao       : Joi.date().allow(null),
    data_nascimento     : Joi.date().allow(null),
    email               : Joi.string().email().allow(null),
    estado_civil        : Joi.string().allow(null),
    inscricao_estadual  : Joi.string().allow(null),
    nacionalidade       : Joi.string().allow(null),
    nome_fantasia       : Joi.string().allow(null),
    rg                  : Joi.string().allow(null),
    sexo                : Joi.string().allow(null),
    tipo                : Joi.string().min(2).max(2).required()
}
class ProdutoHelper {

    constructor() {
      this.schema = produtoSchema;
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

let produtoHelper = new ProdutoHelper();
module.exports   = produtoHelper;