const pessoaModel = require('../../dao/models/pessoa.model');
const Promise = require('bluebird');

const helper = require('./pessoa.helper');

class PessoaService {
    async findAll(){
        return pessoaModel.findAll()
    }

    async findById(pessoaId){
        return pessoaModel.findById(pessoaId, {
            include : [
                {
                    model: telefoneModel
                },
                {
                    model: enderecoModel
                }
            ]
        })        
    }

    async save(payload){
        let validPayload = helper.isValidCreate(payload);

        if (validPayload.error) {
            return Promise.reject({
                message         : "Dados de entrada inválidos, verifique os campos obrigatorios",
                error           : validPayload.error.msg
            }); 
        }   

        const modelBuild = pessoaModel.build(validPayload.value)
        
        const transaction = await connection.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED })
        
        try {
            const pessoa = await modelBuild.save({ transaction });
            
            validPayload.value.enderecos.forEach(endereco => endereco.pessoaId = pessoa.id);
            validPayload.value.telefones.forEach(telefone => telefone.pessoaId = pessoa.id);

            let inserts = [
                enderecoModel.bulkCreate(validPayload.value.enderecos, transaction),
                telefoneModel.bulkCreate(validPayload.value.telefones, transaction),
            ]

            Promise.all(inserts).then(() => {
                return pessoa
            })
        } catch (error) {
            console.log(error)            
        }
    }
}

let pessoa = new PessoaService();

module.exports = pessoa;