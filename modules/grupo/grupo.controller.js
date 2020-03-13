const grupoService = require('./grupo.service')
const Response = require('../../core/response')
class GrupoController {
	constructor() {
		this.service = grupoService
	}

   async save(req, res) {		
		try {
			const result = await this.service.save(req.body);
			res.json({sucesso: true, data: result})

		} catch (error) {
			res.status(409).json({sucesso: false, mensagem: error.mensage, erro: error.error || []})
		}
	}

	async update(req, res) {
		try {
			
			const result = await this.service.update(req.body);
			res.json({sucesso: true, id: result.id , msg: 'Grupo Atualizado com sucesso!'})

		} catch (error) {
			res.status(409).json({sucesso: false, error})
		}
	}

  async findOne(req, res) {
		try {
			
			const result = await this.service.findById(+req.params.id);
			res.json({sucesso: true, result})

    } catch (error) {
			res.status(409).json({sucesso: false, error})

		}
	}
	
  async findAll(req, res) {
    try {
			console.log('aqui');
			const result = await this.service.findAll();
			new Response.sucesso(result)
			return

    } catch (error) {
			res.status(409).json({sucesso: false,  error})

		}
	}
	
	async delete(req, res) {
		try {
			const { id } = req.params
			 await this.service.deleting(id)
			res.status(200).json({sucesso: true, data: `Grupo codigo: ${id} removido Com sucesso!`})

		} catch ( error ) {
			res.status(409).json({sucesso: false, erro: error})
		}	
	}
}

let grupo = new GrupoController();
module.exports = grupo;