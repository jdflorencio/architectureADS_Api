const grupoService = require('./grupo.service')
const Response = require('../../core/response')
class GrupoController {
	constructor() {
		this.service = grupoService
	}

	async save(req, res) {
		try {
			const result = await this.service.save(req.body);
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed()
		}
	}

	async update(req, res) {
		try {

			const result = await this.service.update(req.body);
			res.json({ sucesso: true, id: result.id, msg: 'Grupo Atualizado com sucesso!' })

		} catch (error) {
			new Response(res).preConditionFailed()
		}
	}

	async findOne(req, res) {
		try {

			const result = await this.service.findById(+req.params.id);
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed()

		}
	}

	async findAll(req, res) {
		try {
			const result = await this.service.findAll();
			new Response.sucesso(result)

		} catch (error) {
			new Response(res).preConditionFailed()

		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			await this.service.deleting(id)
			res.status(200).json({ sucesso: true, data: `Grupo codigo: ${id} removido Com sucesso!` })

		} catch (error) {
			res.status(409).json({ sucesso: false, erro: error })
		}
	}
}

let grupo = new GrupoController();
module.exports = grupo;