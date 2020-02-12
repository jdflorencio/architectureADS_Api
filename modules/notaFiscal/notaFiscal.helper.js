const Joi = require('@hapi/joi')

const nota_itens = {
    //id              : Joi.string(),
    notaId          : Joi.number().integer().min(0),
    produtoId       : Joi.number().integer().min(0),
    cfop            : Joi.string().min(4).max(4),
    cst             : Joi.string().min(3).max(4),
    quantidade      : Joi.number(),
    valor           : Joi.number(),
    desconto        : Joi.number(),
    acrescimo       : Joi.number(),
    subtotal        : Joi.number(),
    total           : Joi.number(),
    aliq_icms       : Joi.number(),
    base_icms       : Joi.number(),
    valor_icms      : Joi.number(),
    aliq_subst      : Joi.number(),
    base_subst      : Joi.number(),
    aliq_ipi        : Joi.number(),
    base_ipi        : Joi.number(),
}

const notaFiscalSchema = {
    //id              : Joi.string(), 
    pessoaId        : Joi.number().integer().min(0), 
    numero          : Joi.number().integer().min(1), 
    chave_nfe       : Joi.string().min(44).max(44).allow(null),
    data_emissao    : Joi.date().iso().allow(null),
    data_entrada    : Joi.date().iso().allow(null),
    valor_desconto  : Joi.number(), 
    valor_acrecismo : Joi.number(), 
    subtotal        : Joi.number(), 
    total           : Joi.number(),  
    tipo            : Joi.string(), 
    base_icms       : Joi.number(), 
    valor_icms      : Joi.number(), 
    base_subst      : Joi.number(), 
    base_ipi        : Joi.number(), 
    valor_ipi       : Joi.number(), 
    valor_frete     : Joi.number(), 
    valor_outros    : Joi.number(), 
    valor_seguro    : Joi.number(),
    nota_itens      : Joi.array().items(Joi.object().keys(nota_itens).allow(null)),
}

class NotaFiscalHelper {

    constructor() {
      this.schema = notaFiscalSchema;
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

let notaFiscalHelper = new NotaFiscalHelper();
module.exports   = notaFiscalHelper;