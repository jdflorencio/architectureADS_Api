const users = [
    {id: 1, name: 'Diego', email: "jdflorencio@gmail.com"},
    {id: 2, name: 'Cleiton', email: "cleiton@gmail.com"}
  
  ]
  

const resolvers = {
    Query: {
      users: () => users,
      user: () => users[0]
  },
  
  Mutation: {
      createUser: () => {}
    }
  }

  module.exports = resolvers