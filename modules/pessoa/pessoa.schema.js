const typeDefs = `
type Telefone {
  telefone: String!
}

type Pessoa {
  id: ID!
  nome: String!
  nome_fantasia: String!
  telefones: [Telefone]
  
}

type Query {
   pessoas: [Pessoa!]!
   pessoa(id: ID!): Pessoa
}`;

module.exports = typeDefs