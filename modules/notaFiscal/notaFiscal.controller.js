const notaFiscalService = require('./notaFiscal.service')
const Response = require('../../core/response')
class NotaFiscalController {
	constructor() {
		this.service = notaFiscalService
	}

	async save(req, res) {
		try {
			const result = await this.service.save(req.body);
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed(error)
		}
	}

	async update(req, res) {
		try {

			const result = await this.service.update(req.body)
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed(error)
		}
	}

	async findOne(req, res) {
		try {
			const result = await this.service.findById(+req.params.id);
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed(error)
		}
	}

	async findAll(req, res) {
		try {

			console.log('<<< TESTE >>')
			const result = await this.service.findAll(+req.query.pagina);
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed(error)
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			await this.service.deleting(id)
			new Response(res).success(id, `NotaFiscal codigo: ${id} removido Com sucesso!`)

		} catch (error) {
			new Response(res).preConditionFailed(error)(`Erro ao executar a ação ${error.mensagem}`)
		}
	}
}

let notaFiscal = new NotaFiscalController();
module.exports = notaFiscal;