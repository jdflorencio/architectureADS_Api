const Joi = require('joi');

const enderecoSchema = {
    //pessoaId    : Joi.number().integer().min(0).required(),
    logradouro  : Joi.string().min(3).max(40).required(),
    numero      : Joi.string().min(1).max(6).required(),
    bairro      : Joi.string().min(1).max(60).required(),
    cidade      : Joi.string().min(2).max(60).required(),
    bairro      : Joi.string().min(2).max(2).required()
}

const telefoneSchema = {
    //pessoaId    : Joi.number().integer().min(0).required(),
    tipo        : Joi.number().integer().valid([1,2]).required(),
    numero      : Joi.number().integer().required()
}

const pessoaSchema = {    
    nome       : Joi.string().min(3).max(60).required(),
    nascimento : Joi.date().iso(),
    enderecos  : Joi.array().items(Joi.object().keys(enderecoSchema)).allow(null),
    telefones  : Joi.array().items(Joi.object().keys(telefoneSchema)).allow(null)          
}


class PessoaHelper {
    constructor() {
        this.schema = pessoaSchema;
    }

    isValidCreate(payload) {
        delete this.schema.id;

        const schema = Joi.object().keys(this.schema);
        
        const result = Joi.validate(payload, schema, {allowUnknown : true});
        this.resetJoiErrorMessage(result);
        
        return result;  
    }

    isValidUpdate(payload) {
        this.schema.id = Joi.number().integer().required();

        const schema = Joi.object().keys(payload);
        
        const result = Joi.validate(payload, schema, {allowUnknown : true});
        common.resetJoiErrorMessage(result);
        
        return result;  
    }

    resetJoiErrorMessage(joiResult) {
        if (joiResult.error) {
          const erro = [];
          if (joiResult.error.details && joiResult.error.details.length > 0) {
            joiResult.error.details.map(function(e) {
              erro.push(e.message);
            });
          }
          joiResult.error.msg = erro;
        }
      }
}

let pessoaHelper = new PessoaHelper();
module.exports   = pessoaHelper;