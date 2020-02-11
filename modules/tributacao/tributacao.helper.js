const Joi = require('@hapi/joi')

const tributacaoSchema = {

  id                              : Joi.number(),
  descricao                       : Joi.string().min(1).max(60).required(),
  aliq_icms_venda_dentro_estado   : Joi.number(),
  aliq_icms_venda_fora_estado     : Joi.number(),
  aliq_icms_reducao_venda         : Joi.number(),
  cst_base_venda                  : Joi.string().min(3).max(4),
  cst_pis_venda                   : Joi.string().min(3).max(4),
  aliq_pis_venda                  : Joi.number(),
  cst_cofins_venda                : Joi.string().min(3).max(4),
  aliq_cofins_venda               : Joi.number(),
  aliq_icms_compra_dentro_estado  : Joi.number(),
  aliq_icms_compra_fora_estado    : Joi.number(),
  aliq_icms_reducao_compra        : Joi.number(),
  cst_base_compra                 : Joi.string().min(3).max(4),
  cst_pis_compra                  : Joi.string().min(3).max(4),
  aliq_pis_compra                 : Joi.number(),
  cst_cofins_compra               : Joi.string().min(3).max(4),
  aliq_cofins_compra              : Joi.number(),
  mva                             : Joi.number(),
}

class TributacaoHelper {

    constructor() {
      this.schema = tributacaoSchema;
    }

    isValidCreate(payload) {
        delete this.schema.id
        const schema = Joi.object().keys(this.schema)
        const result = schema.validate(payload, {allowUnknown : true, stripUnknown : true})
        return this.resetJoiErrorMessage(result)          
    }

    isValidUpdate(payload) {
        this.schema.id = Joi.number().integer().required()
        const schema = Joi.object().keys(this.schema)
        const result = schema.validate(payload, {allowUnknown : true})
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

let tributacaoHelper = new TributacaoHelper();
module.exports   = tributacaoHelper;