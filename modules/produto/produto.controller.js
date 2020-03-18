const produtoService = require('./produto.service')
const Response = require('../../core/response')

class ProdutoController {
	constructor() {
		this.service = produtoService
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
			new Response(res).success(result)


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

	async filter(req, res) {
		try {
			const result = await this.service.findData(req.params.data);
			new Response(res).success(result)
		} catch (error) {
			new Response(res).preConditionFailed()

		}
	}

	async findAll(req, res) {
		try {
			const result = await this.service.findAll();
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed()
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			await this.service.deleting(id)
			new Response(res).success(id, `Produto codigo: ${id} removido Com sucesso!` )

		} catch (error) {
			new Response(res).preConditionFailed()
		}
	}
}

let produto = new ProdutoController();
module.exports = produto;