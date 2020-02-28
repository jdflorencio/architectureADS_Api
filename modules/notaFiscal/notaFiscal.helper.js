const Joi = require('@hapi/joi')

const nota_itens = {
    //id              : Joi.string(),
    notaId          : Joi.number().integer().min(0).required(),
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

const cabecalho = {
 
  // id            : Joi.number().integer().min(0).allow(null), 
  numero          : Joi.number(),    /*int(11)*/
  pessoaId        : Joi.number().integer().min(0), 
  chave_nfe       : Joi.string().min(44).max(44).allow(null),    /*varchar(44)*/
  data_emissao    : Joi.date().iso().allow(null),    /*datetime*/
  data_entrada    : Joi.date().iso().allow(null),    /*datetime  */
  valor_desconto  : Joi.number(),    /*decimal(12,4)*/
  valor_acrecismo : Joi.number(),    /*decimal(12,4)*/
  subtotal        : Joi.number(),    /*decimal(12,4)*/
  total           : Joi.number(),    /*decimal(12,4)*/
  // tipo            : Joi.number(),    /*enum('ENTRADA','SAIDA')*/
  base_icms       : Joi.number(),    /*decimal(12,4)*/
  valor_icms      : Joi.number(),    /*decimal(12,4)*/
  base_subst      : Joi.number(),    /*decimal(12,4)*/
  base_ipi        : Joi.number(),    /*decimal(12,4)*/
  valor_ipi       : Joi.number(),    /*decimal(12,4)*/
  valor_frete     : Joi.number(),    /*decimal(12,4)*/
  valor_outros    : Joi.number(),    /*decimal(12,4)*/
  valor_seguro    : Joi.number(),    /*decimal(12,4)*/

}

const itens = {
  descricao :  Joi.string().min(4).max(44).required(),
  nota_itens : Joi.object({nota_itens }).required()
}

const notaFiscalSchema = {    
    cabecalho  : Joi.object({cabecalho}),
    itens      : Joi.array().items(Joi.object().keys(itens).allow(null))
  
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
        this.schema.cabecalho.id = Joi.number().integer().required()
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