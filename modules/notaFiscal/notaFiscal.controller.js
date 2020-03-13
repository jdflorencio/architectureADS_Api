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
			new Response(res).preConditionFailed()
		}
	}

	async update(req, res) {
		try {

			const result = await this.service.update(req.body)
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

	async findAll(req, res) {
		try {

			console.log('<<< TESTE >>')
			const result = await this.service.findAll(+req.query.pagina);
			new Response(res).success(result)

		} catch (error) {
			new Response(res).preConditionFailed()
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			await this.service.deleting(id)
			res.status(200).json({ sucesso: true, data: `NotaFiscal codigo: ${id} removido Com sucesso!` })

		} catch (error) {
			res.status(409).json({ sucesso: false, erro: error })
		}
	}
}

let notaFiscal = new NotaFiscalController();
module.exports = notaFiscal;