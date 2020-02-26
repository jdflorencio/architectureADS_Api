const {Sequelize ,connection} = require('../../dao/connection')
const notaFiscalModel = require('../../dao/models/nota.model')
const itensFiscalModel = require('../../dao/models/nota_itens.model')
const pessoaModel = require('../../dao/models/pessoa.model')
const produtoModel =require('../../dao/models/produto.model')
const helper = require('./notaFiscal.helper')

const Promise = require('bluebird');

class NotaFiscalService {

	async findAll() {
		
		return await notaFiscalModel.findAll({
			include:[
				{
					model: pessoaModel,
					attributes: {
						exclude: ['sexo', 'data_nascimento', 'data_fundacao', 'nacionalidade', 'estado_civil', 'rg', 'createdAt', 'updatedAt' ]
					}
				}
			],
			attributes: ['numero', 'chave_nfe', 'data_emissao', 'tipo', 'total']
		} )
	}

	async findById(notaFiscalId) {
		try{
			const cabecalho = await notaFiscalModel.findByPk(notaFiscalId, {
				include: [
					{
						model: pessoaModel,
						attributes: ['id','tipo', 'nome', 'nome_fantasia','cpf_cnpj' ]
					}
				],
				attributes: ['id','pessoaId' ,'numero', 'chave_nfe', 'data_emissao', 'tipo', 'total']
			})

			const itens = await produtoModel.findAll({
				attributes: ["descricao", "vl_venda", "estoque_atual", "referencia", "id"],
				include: [
					{
						model: itensFiscalModel,
						
						where: [{
							notaId: cabecalho.id
						}]
					}
				]

			})

			return {
				cabecalho, itens
			}
		} catch (error) {
			console.log(error)
		}
	}
	

	async save(payload) {
		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			let validPayload = helper.isValidCreate(payload)			
			if (validPayload.error) {
				return Promise.reject({
					message         : "Dados de entrada inválidos, verifique os campos obrigatorios",
					error           : validPayload.error.msg
				});
			}
					
			const modelBuild = notaFiscalModel.build(validPayload.value)
			const cabecalhoNota = await modelBuild.save({ transaction })

			validPayload.value.nota_itens.map( item => item.notaId = cabecalhoNota.id)

			let inserts = [
				itensFiscalModel.bulkCreate(validPayload.value.nota_itens, {transaction})
			]

			return Promise.all(inserts)
			.then(() => {
				transaction.commit()
				return cabecalhoNota
			})
			.catch( error => {
				console.log(error)
				transaction.rollback()
				throw error
			})

		} catch ( error ) {		
			console.log(error)	
			transaction.rollback()
			throw error
		}
	}

	async update(payload) {

				
		let validPayload = helper.isValidUpdate(payload)
				
		if (validPayload.error) {
			return Promise.reject({
				message         : "Dados de entrada inválidos, verifique os campos obrigatorios",
				error           : validPayload.error.msg
			});
		}
		
		let notaFiscal = await notaFiscalModel.findByPk(validPayload.value.id)

		if(!notaFiscal) {
			return Promise.reject({
				message: "NotaFiscal não encontrada.",
				error: ["NotaFiscal não encontrada"]
			})
		}

		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			await notaFiscalModel.update(validPayload.value, {where: {id: notaFiscal.id}}, { transaction })

			transaction.commit()

		} catch ( error ) {
			transaction.rollback()
			return {status: 400, error}
		}
	}

	async deleting(notaFiscalId) {
		return await notaFiscalModel.destroy({ where: {id: notaFiscalId}})
	}
}

let notaFiscal = new NotaFiscalService();
module.exports = notaFiscal;