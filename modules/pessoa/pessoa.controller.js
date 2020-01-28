//const pessoaService = require('./pessoa.service')
class PessoaController {
	constructor() {
		//this.service = pessoaService;
		console.log('estou no controller pessoa')
	}

   async save(req, res) {
		 console.log('Salvando o novo cliente...')
		try {
			const result = await this.service.save(req.body);
			res.json({sucesso: true, data: result})    
		} catch (error) {
			console.log(error)
			res.status(409).json({sucesso: false, erro: error.message})   
		}
	}

  async update(req, res) {
		console.log('Atualizando o cliente....')

	}
	
  async findOne(req, res) {
    console.log('buscando o cliente solicitado...')
	}
	
  async findAll(req, res) {
    try {
			const result = await this.service.findAll();
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