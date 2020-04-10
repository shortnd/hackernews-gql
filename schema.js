const { gql } = require("apollo-server");

const typesDef = gql`
  type Subscription {
    newLink: Link
    newVote: Vote
  }

  type Query {
    info: String!
    feed: [Link!]!
    link(id: ID!): Link
    me: User
  }

  type Mutation {
    addLink(url: String!, description: String!): Link!
    updateLink(id: ID!, url: String, description: String): Link
    deleteLink(id: ID!): Link
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    deleteUser(id: ID!): User
    vote(linkId: ID!): Vote
  }

  type Link {
    id: ID!
    description: String!
    url: String!
    postedBy: User!
    votes: [Vote!]!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    links: [Link!]!
    votes: [Vote!]!
  }

  type Vote {
    id: ID!
    link: Link!
    user: User!
  }
`;
module.exports = typesDef;
