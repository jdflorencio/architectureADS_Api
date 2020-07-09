const { mergeTypeDefs  } = require('graphql-tools')

const pessoaSchema = require('../modules/pessoa/pessoa.schema')
const types  =  [
    pessoaSchema
]



module.exports = mergeTypeDefs(types , { all: true });