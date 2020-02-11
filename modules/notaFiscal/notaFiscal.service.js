const {Sequelize ,connection} = require('../../dao/connection')
const notaFiscalModel = require('../../dao/models/notaFiscal.model')
const helper = require('./notaFiscal.helper')

const Promise = require('bluebird');

class NotaFiscalService {

	async findAll() {
		return await notaFiscalModel.findAll()
	}

	async findById(notaFiscalId) {
		return await notaFiscalModel.findByPk(notaFiscalId)
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
			await modelBuild.save({ transaction })

			transaction.commit()

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