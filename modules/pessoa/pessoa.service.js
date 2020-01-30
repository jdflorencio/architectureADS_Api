const {Sequelize ,connection} = require('../../dao/connection')
const pessoaModel = require('../../dao/models/pessoa.model')
const enderecoModel = require('../../dao/models/endereco.model')
const telefoneModel = require('../../dao/models/telefone.model')
const helper = require('./pessoa.helper')

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
			let isUpdate;
			let validPayload;
			
			switch(Number.isInteger(payload.id)) {
				case true:
					isUpdate = true
					validPayload = helper.isValidUpdate(payload)
					
					await enderecoModel.destroy({where: {pessoaId: payload.id }}, {transaction})
					await telefoneModel.destroy({where: {pessoaId: payload.id}}, {transaction})
					break
					case false:
						isUpdate = false
						validPayload = helper.isValidCreate(payload)
						break
					}
					
					if (validPayload.error) {
						return Promise.reject({
							message         : "Dados de entrada inválidos, verifique os campos obrigatorios",
							error           : validPayload.error.msg
						});
					}
					
					const modelBuild = pessoaModel.build(validPayload.value)
					
			let pessoa;
			switch(isUpdate) {
				case true :

					pessoa = await pessoaModel.update(validPayload.value,{where: {id: payload.id}, returning: true },{ transaction })
					pessoa = payload
					break
				case false:
					pessoa = await modelBuild.save({ transaction })
				
					break
				}

			validPayload.value.enderecos.map(endereco => endereco.pessoaId = pessoa.id)
			validPayload.value.telefones.map(telefone => telefone.pessoaId = pessoa.id)

			let inserts = [
				enderecoModel.bulkCreate(validPayload.value.enderecos, transaction),
				telefoneModel.bulkCreate(validPayload.value.telefones, transaction),
			]

			Promise.all(inserts).then(() => {
				console.log()
				return pessoa
			})

			await transaction.commit()
			return pessoa

		} catch ( error ) {
			console.log(error)
			await transaction.rollback()
			return {status: 400, msg: "Cliente adicionado com Sucesso!"}
		}
	}

	async deleting(pessoaId) {
		return await pessoaModel.destroy({ where: {id: pessoaId}})
	}
}

let pessoa = new PessoaService();

module.exports = pessoa;