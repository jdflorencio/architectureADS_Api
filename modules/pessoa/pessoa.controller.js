const pessoaService = require('./pessoa.service');

class PessoaController {
    constructor(){
        this.service = pessoaService;
    }

    save(req, res) {
        try {
            const result = await this.service.save(req.body);
            res.json({sucesso: true, data: result})    
        } catch (error) {
            console.log(error)
            res.status(409).json({sucesso: false, erro: error.message})   
        }        
    }

    update(req, res) {

    }

    findOne(req, res) {

    }

    findAll(req, res) {
        try {
            const result = await this.service.findAll();
            res.json({sucesso: true, data: result})    
        } catch (error) {
            res.status(409).json({sucesso: false, erro: error.message})
        }
    }
}

let pessoa = new PessoaController();

module.exports = pessoa;