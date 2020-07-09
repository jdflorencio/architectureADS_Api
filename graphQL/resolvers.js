const { mergeResolvers } = require('graphql-tools')
console.log('RESOLVER >>> ',mergeResolvers)
const pessoaResolver = require('../modules/pessoa/pessoa.resolvers')
const resolvers = [
    pessoaResolver
]

module.exports = mergeResolvers(resolvers);