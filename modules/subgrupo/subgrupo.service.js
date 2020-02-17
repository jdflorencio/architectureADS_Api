const {Sequelize ,connection} = require('../../dao/connection')
const subgrupoModel = require('../../dao/models/subgrupo.model')
const grupoModel = require('./../../dao/models/grupo.model')
const helper = require('./subgrupo.helper')

const Promise = require('bluebird');

class SubGrupoService {

	async findAll() {
		return await subgrupoModel.findAll()
	}

	async findById(subgrupoId) {
		try {
			return await subgrupoModel.findByPk(subgrupoId, {
				include: [
				{
					model: grupoModel,
					attributes : ["id", "descricao"]
				}
				]
			})

		} catch (error) {
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
					
			const modelBuild = subgrupoModel.build(validPayload.value)
			const subgrupo = await modelBuild.save({ transaction })

			transaction.commit()
			return subgrupo

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
		
		let subgrupo = await subgrupoModel.findByPk(validPayload.value.id)

		if(!subgrupo) {
			return Promise.reject({
				message: "SubGrupo não encontrada.",
				error: ["SubGrupo não encontrada"]
			})
		}

		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			await subgrupoModel.update(validPayload.value, {where: {id: subgrupo.id}}, { transaction })

			transaction.commit()
			return subgrupo

		} catch ( error ) {
			transaction.rollback()
			return {status: 400, error}
		}
	}

	async deleting(subgrupoId) {
		return await subgrupoModel.destroy({ where: {id: subgrupoId}})
	}
}

let subgrupo = new SubGrupoService();

module.exports = subgrupo;