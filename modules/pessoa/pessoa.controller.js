const pessoaService = require('./pessoa.service')
class PessoaController {

   async save(req, res) {
		
		try {

			const result = await pessoaService.save(req.body);
			console.log('>>>>>>>>', result)
			res.json({sucesso: true, data: result})

		} catch (error) {
			res.status(409).json({sucesso: false, erro: error.message})   
		}
	}

  async update(req, res) {
		console.log('Atualizando o cliente....')

	}
	
  async findOne(req, res) {

		try {

			const { id } = req.params		
			const result = await pessoaService.findById(id);
			res.json({sucesso: true, data: result})

    } catch (error) {
			res.status(409).json({sucesso: false, erro: error.message})

		}
	}
	
  async findAll(req, res) {

    try {

			const result = await pessoaService.findAll();
			res.json({sucesso: true, data: result})

    } catch (error) {
			res.status(409).json({sucesso: false, erro: error.message})

		}
	}
	
	async delete(req, res) {
		console.log('deleting....')
	}
}

let pessoa = new PessoaController();
module.exports = pessoa;