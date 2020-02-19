const {Sequelize ,connection} = require('../../dao/connection')
const {Op} = Sequelize
const produtoModel = require('../../dao/models/produto.model')
const grupoModel = require('../../dao/models/grupo.model')
const subgrupoModel = require('../../dao/models/subgrupo.model')
const helper = require('../produto/produto.helper')

const Promise = require('bluebird');

class ProdutoService {

	async findAll() {
		return await produtoModel.findAll()
	}

	async findById(produtoId) {
		try {

			console.log(produtoId)
			const produto = await produtoModel.findByPk(produtoId)		

			const grupo =  await grupoModel.findByPk(produto.grupoId, {
				attributes: {
					exclude: ["log_criacao","log_atualizacao",  "log_pct_usuario"]
				}}) || null

			const subgrupo = await subgrupoModel.findByPk(produto.subgrupoId,  {
				attributes: {
					exclude: ["log_criacao","log_atualizacao",  "log_pct_usuario"]
				}
			}) || null 
	
			return {
				produto, grupo, subgrupo
			}

		} catch (error) {	
			console.log(error)
			throw error
		}
	}

	async findData(data) {
		console.log('>>>>>>>>',data)
		try {
			const produto = await produtoModel.findAll({
				where: {
					[Op.or]:[
						{
							descricao:{[Op.substring]:data}
						},
						{
							id:data
						},
						{
							codigo_ean: data
						}
					]
				} 
			})		

			return produto

		} catch (error) {	
			console.log(error)
			throw error
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
					
			const modelBuild = produtoModel.build(validPayload.value)
			const produto = await modelBuild.save({ transaction })

			transaction.commit()
			return produto.id

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
			return true

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