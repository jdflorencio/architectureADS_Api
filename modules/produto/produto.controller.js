const produtoService = require('./produto.service')
class ProdutoController {
	constructor() {
		this.service = produtoService
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
			res.json({sucesso: true, id: result.id , msg: 'Produto Atualizado com sucesso!'})

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
			res.status(200).json({sucesso: true, data: `Produto codigo: ${id} removido Com sucesso!`})

		} catch ( error ) {
			res.status(409).json({sucesso: false, erro: error})
		}	
	}
}

let produto = new ProdutoController();
module.exports = produto;