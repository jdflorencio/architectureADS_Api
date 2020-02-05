const pessoaService = require('./pessoa.service')
class PessoaController {
	constructor() {
		this.service = pessoaService
	}

   async save(req, res) {		
		try {
			const result = await this.service.save(req.body);
			res.json({sucesso: true, id: result.id, msg: 'Cliente Atualizado com sucesso!'})

		} catch (error) {
			res.status(409).json({sucesso: false, error})
		}
	}

	async update(req, res) {		
		try {
		
			const result = await this.service.update(req.body);
			res.json({sucesso: true, id: result.id , msg: 'Cliente Atualizado com sucesso!'})

		} catch (error) {
			res.status(409).json({sucesso: false, error})
		}
	}

  async findOne(req, res) {
		try {
			const { id } = req.params
			const result = await this.service.findById(id);
			res.json({sucesso: true, result})

    } catch (error) {
			res.status(409).json({sucesso: false, error})

		}
	}
	
  async findAll(req, res) {
    try {
			const result = await this.service.findAll();
			res.json({sucesso: true, result})

    } catch (error) {
			res.status(409).json({sucesso: false,  error})

		}
	}
	
	async delete(req, res) {
		try {
			const { id } = req.params
			 await this.service.deleting(id)
			res.status(200).json({sucesso: true, data: `Cliente codigo: ${id} removido Com sucesso!`})

		} catch ( error ) {
			res.status(409).json({sucesso: false, erro: error})
		}	
	}
}

let pessoa = new PessoaController();
module.exports = pessoa;