const {Sequelize ,connection} = require('../../dao/connection')
const pessoaModel = require('../../dao/models/pessoa.model')
const enderecoModel = require('../../dao/models/endereco.model')
const telefoneModel = require('../../dao/models/telefone.model')
const helper = require('../pessoa/pessoa.helper')


const Promise = require('bluebird');

class PessoaService {

	async findAll() {
			return await pessoaModel.findAll({attributes: [
        'id',
        'tipo',
        'nome',
        'nome_fantasia',
        'createdAt',
        'updatedAt'
		]})
	}

	async findById(pessoaId) {
		return await pessoaModel.findByPk(pessoaId, {
			include: [
				{
					model: enderecoModel,
					attributes: {
						exclude: ['id']
					}
				},
				{
					model: telefoneModel,
					attributes: {
						exclude: ['id']
					}
				},
			],
		})
	}

	async save(payload) {
		try {
			const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })

			let validPayload = helper.isValidCreate(payload)
			
			if (validPayload.error) {
				return Promise.reject({
					message         : "Dados de entrada inválidos, verifique os campos obrigatorios",
					error           : validPayload.error.msg
				});
			}
					
			const modelBuild = pessoaModel.build(validPayload.value)
			let pessoa = await modelBuild.save({ transaction })

			validPayload.value.enderecos.map(endereco => endereco.pessoaId = pessoa.id)
			validPayload.value.telefones.map(telefone => telefone.pessoaId = pessoa.id)

			let inserts = [
				enderecoModel.bulkCreate(validPayload.value.enderecos, transaction),
				telefoneModel.bulkCreate(validPayload.value.telefones, transaction),
			]

			Promise.all(inserts).then(() => {
				return pessoa
			})
			transaction.commit()

			return pessoa

		} catch ( error ) {
			
			transaction.rollback()
			return {status: 400, msg: error }
		}
	}

	async update(payload) {

		try {
			const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })			
			let validPayload = helper.isValidUpdate(payload)
					
			if (validPayload.error) {
				return Promise.reject({
					message         : "Dados de entrada inválidos, verifique os campos obrigatorios",
					error           : validPayload.error.msg
			  });
			}
			
			let pessoa = await pessoaModel.findByPk(validPayload.value.id)

			await pessoaModel.update(validPayload.value, {where: {id: pessoa.id}}, { transaction })	
			
			if ( validPayload.value.enderecos ) {
				validPayload.value.enderecos.map(endereco => endereco.pessoaId = pessoa.id)
			}

			if (validPayload.value.telefones) {
				validPayload.value.telefones.map(telefone => telefone.pessoaId = pessoa.id)
			}		
			
			await enderecoModel.destroy({where: {pessoaId: pessoa.id }}, {transaction})
			await telefoneModel.destroy({where: {pessoaId: pessoa.id }}, {transaction})
			
			let inserts = []

			inserts.push( payload.enderecos ? enderecoModel.bulkCreate(validPayload.value.enderecos, transaction) : null)
			inserts.push( payload.telefones ?  telefoneModel.bulkCreate(validPayload.value.telefones, transaction) : null)

			Promise.all(inserts).then(() => {
				return pessoa
			})
			
			transaction.commit()
			return pessoa

		} catch ( error ) {
			transaction.rollback()
			return {status: 400, error}
		}
	}

	async deleting(pessoaId) {
		return await pessoaModel.destroy({ where: {id: pessoaId}})
	}
}

let pessoa = new PessoaService();

module.exports = pessoa;