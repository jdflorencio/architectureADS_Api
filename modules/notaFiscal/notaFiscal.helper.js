const Joi = require('@hapi/joi')

const nota_itens = {
    //id              : Joi.string(),
    notaId          : Joi.number().integer().min(0),
    produtoId       : Joi.number().integer().min(0),
    cfop            : Joi.string().min(4).max(4),
    cst             : Joi.string().min(3).max(4),
    quantidade      : Joi.decimal(),
    valor           : Joi.decimal(),
    desconto        : Joi.decimal(),
    acrescimo       : Joi.decimal(),
    subtotal        : Joi.decimal(),
    total           : Joi.decimal(),
    aliq_icms       : Joi.decimal(),
    base_icms       : Joi.decimal(),
    valor_icms      : Joi.decimal(),
    aliq_subst      : Joi.decimal(),
    base_subst      : Joi.decimal(),
    aliq_ipi        : Joi.decimal(),
    base_ipi        : Joi.decimal(),
}

const notaFiscalSchema = {
    //id              : Joi.string(), 
    pessoaId        : Joi.number().integer().min(0), 
    numero          : Joi.number().integer().min(1), 
    chave_nfe       : Joi.string().min(44).max(44), 
    data_emissao    : Joi.date().iso(), 
    data_entrada    : Joi.date().iso(),
    valor_desconto  : Joi.decimal(), 
    valor_acrecismo : Joi.decimal(), 
    subtotal        : Joi.decimal(), 
    total           : Joi.decimal(),  
    tipo            : Joi.decimal(), 
    base_icms       : Joi.decimal(), 
    valor_icms      : Joi.decimal(), 
    base_subst      : Joi.decimal(), 
    base_ipi        : Joi.decimal(), 
    valor_ipi       : Joi.decimal(), 
    valor_frete     : Joi.decimal(), 
    valor_outros    : Joi.decimal(), 
    valor_seguro    : Joi.decimal(),
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