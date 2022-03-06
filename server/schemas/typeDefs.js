const {gql} = require('apollo-server-express');

const typeDefs = gql`
type User{
    _id: ID 
    userName: String
    email: String
    password: String
    file_name: String
}

type Game{
    _id: ID 
    isFeatured: Boolean 
}

type Score{
    _id: ID 
    score: String
}

type Query {
    user:[User]
    game:[Game]
  scores: [Score]
}

type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    signUp(userName: String!, email: String!, password: String!): User
    login(userName: String!, password: String!): Auth
    updateUser(userId: ID!): User
    removeUser(userId: ID!): User
    addScore(score: String!):Score
}
`;

module.exports = typeDefs;