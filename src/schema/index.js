const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

// Define your types here.
const typeDefs = `
type Link {
    id: ID!
    url: String!
    description: String!
    postedBy: User
    votes: [Vote!]!
  }

type Query{
  allLinks: [Link!]!
  allUsers: [User!]!
}

type Mutation {
    createLink(url: String!, description: String!): Link
    createVote(linkId: ID!): Vote
    createUser(name: String!, authProvider: AuthProviderSignupData!): User
    signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
  }

  type User {
    id: ID!
    name: String!
    email: String
    password: String
    votes: [Vote!]!
  }

input AuthProviderSignupData {
    email: AUTH_PROVIDER_EMAIL
}

input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
}

type SigninPayload {
    token: String
    user: User
}

type Vote {
    id: ID!
    user: User!
    link: Link!
  }

`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });