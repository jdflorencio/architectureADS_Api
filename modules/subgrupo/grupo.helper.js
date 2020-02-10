const Joi = require('@hapi/joi')


const subgrupoSchema = {

	id              : Joi.number().integer().min(1),
	referencia      : Joi.number().integer().min(1),
	subgrupoId         : Joi.number().integer().min(1),
	subsubgrupoId      : Joi.number().integer().min(1),
	tributacaoId    : Joi.number().integer().min(1),
	refencia        : Joi.string().min(1).max(30),
	descricao       : Joi.string().min(1).max(60),
	codigo_ean      : Joi.string().min(1).max(13),
	estoque_atual   : Joi.number(),
	estoque_minimo  : Joi.number(), 
	estoque_maximo  : Joi.number(),
	vl_custo        : Joi.number(),
	vl_venda        : Joi.number(),
	ncm             : Joi.string().min(1).max(10),
	status          : Joi. ENUM('ATIVO', 'INATIVO'),
	fabricante      : Joi.string().min(1).max(60),
	log_criacao     : Joi.date().iso(),
	log_atualizacao : Joi.date().iso(),
	log_pct_usuario : Joi.number().integer().min(1),
}

class SubGrupoHelper {

    constructor() {
      this.schema = subgrupoSchema;
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

let subgrupoHelper = new SubGrupoHelper();
module.exports   = subgrupoHelper;