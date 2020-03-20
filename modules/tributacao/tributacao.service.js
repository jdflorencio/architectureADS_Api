const { Sequelize, connection } = require('../../dao/connection')
const tributacaoModel = require('../../dao/models/tributacao.model')
const helper = require('./tributacao.helper')

const Promise = require('bluebird');

class TributacaoService {

	async findAll() {
		return await tributacaoModel.findAll()
	}

	async findById(tributacaoId) {
		return await tributacaoModel.findByPk(tributacaoId)
	}

	async save(payload) {
		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {
			let validPayload = helper.isValidCreate(payload)
			if (validPayload.error) {

				return Promise.reject({
					message: "Dados de entrada inválidos, verifique os campos obrigatorios",
					error: validPayload.error.msg
				});
			}
			const modelBuild = tributacaoModel.build(validPayload.value)
			const tributacao = await modelBuild.save({ transaction })

			transaction.commit()
			return tributacao

		} catch (error) {

			transaction.rollback()
			throw error
		}
	}

	async update(payload) {

		let validPayload = helper.isValidUpdate(payload)

		if (validPayload.error) {
			return Promise.reject({
				message: "Dados de entrada inválidos, verifique os campos obrigatorios",
				error: validPayload.error.msg
			});
		}

		let tributacao = await tributacaoModel.findByPk(validPayload.value.id)

		if (!tributacao) {
			return Promise.reject({
				message: "Tributacao não encontrada.",
				error: ["Tributacao não encontrada"]
			})
		}

		const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

		try {

			await tributacaoModel.update(validPayload.value, { where: { id: tributacao.id } }, { transaction })

			transaction.commit()

			return tributacao

		} catch (error) {
			transaction.rollback()
			return { status: 400, error }
		}
	}

	async deleting(tributacaoId) {
		return await tributacaoModel.destroy({ where: { id: tributacaoId } })
	}
}

let tributacao = new TributacaoService();

module.exports = tributacao;