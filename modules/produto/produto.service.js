const {Sequelize ,connection} = require('../../dao/connection')
const produtoModel = require('../../dao/models/produto.model')
const helper = require('../produto/produto.helper')

const Promise = require('bluebird');

class ProdutoService {

	async findAll() {
		return await produtoModel.findAll()
	}

	async findById(produtoId) {
		return await produtoModel.findByPk(produtoId)
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
					
			const modelBuild = produtoModel.build(validPayload.value)
			let produto = await modelBuild.save({ transaction })

		transaction.commit()

		} catch ( error ) {		
			console.log(errors)	
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
		
		let produto = await produtoModel.findByPk(validPayload.value.id)

		if(!produto) {
			return Promise.reject({
				message: "Produto não encontrada.",
				error: ["Produto não encontrada"]
			})
		}

		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			await produtoModel.update(validPayload.value, {where: {id: produto.id}}, { transaction })

			transaction.commit()

		} catch ( error ) {
			transaction.rollback()
			return {status: 400, error}
		}
	}

	async deleting(produtoId) {
		return await produtoModel.destroy({ where: {id: produtoId}})
	}
}

let produto = new ProdutoService();

module.exports = produto;