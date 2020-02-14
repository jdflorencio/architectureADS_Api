const {Sequelize ,connection} = require('../../dao/connection')
const grupoModel = require('../../dao/models/grupo.model')
const helper = require('../grupo/grupo.helper')

const Promise = require('bluebird');

class GrupoService {

	async findAll() {
		return await grupoModel.findAll()
	}

	async findById(grupoId) {
		return await grupoModel.findByPk(grupoId)
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
					
			const modelBuild = grupoModel.build(validPayload.value)				
			await modelBuild.save({ transaction })

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
		
		let grupo = await grupoModel.findByPk(validPayload.value.id)

		if(!grupo) {
			return Promise.reject({
				message: "Grupo não encontrada.",
				error: ["Grupo não encontrada"]
			})
		}

		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			await grupoModel.update(validPayload.value, {where: {id: grupo.id}}, { transaction })
			transaction.commit()
			
			return grupo

		} catch ( error ) {
			transaction.rollback()
			return {status: 400, error}
		}
	}

	async deleting(grupoId) {
		return await grupoModel.destroy({ where: {id: grupoId}})
	}
}

let grupo = new GrupoService();

module.exports = grupo;