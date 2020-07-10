const { mergeResolvers } = require('graphql-tools')

const pessoaResolver = require('../modules/pessoa/pessoa.resolvers')
const resolvers = [
    pessoaResolver
]

module.exports = mergeResolvers(resolvers);