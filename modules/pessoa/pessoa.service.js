const {Sequelize ,connection} = require('../../dao/connection')
const pessoaModel = require('../../dao/models/pessoa.model')
const enderecoModel = require('../../dao/models/endereco.model')
const telefoneModel = require('../../dao/models/telefone.model')
const helper = require('../pessoa/pessoa.helper')


// const Promise = require('bluebird');

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

			await transaction.commit()
			return pessoa

		} catch ( error ) {
			
			console.log(error)
			await transaction.rollback()
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
			
			let consultarPessoa = await pessoaModel.findByPk(validPayload.value.id)
			console.log("achou...",consultarPessoa)

			let pessoa = await pessoaModel.upsert(validPayload.value, { transaction })
			pessoa = payload
			
			if ( Object.keys(validPayload.value.enderecos[0]).length > 0 ) {
				validPayload.value.enderecos.map(endereco => endereco.pessoaId = pessoa.id)
			}

			if ( Object.keys(validPayload.value.telefones[0]).length > 0 ) {
				validPayload.value.telefones.map(telefone => telefone.pessoaId = pessoa.id)
			}
			
			await enderecoModel.destroy({where: {pessoaId: payload.id }}, {transaction})
			await telefoneModel.destroy({where: {pessoaId: payload.id}}, {transaction})
			
			let inserts = []

			inserts.push(  validPayload.value.enderecos != null ? enderecoModel.bulkCreate(validPayload.value.enderecos, transaction) : [{}] )
			inserts.push(  validPayload.value.telefones != null ? telefoneModel.bulkCreate(validPayload.value.telefones, transaction) : [{}] )

			Promise.all(inserts).then(() => {
				return pessoa
			})

			await transaction.commit()
			return pessoa

		} catch ( error ) {
			console.log(error)
			await transaction.rollback()
			return {status: 400, error}
		}
	}

	async deleting(pessoaId) {
		return await pessoaModel.destroy({ where: {id: pessoaId}})
	}
}

let pessoa = new PessoaService();

module.exports = pessoa;