const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');

const { mongoose } = require('./db');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length;
const resolvers = {
  Query,
  Mutation,
  User,
  Link
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {...req.headers }
    // return req
  }
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connecton error'));
db.once('open', () => {
  server.listen().then(({ url }) => {
    console.log(`Sever listening on ${url}`)
  });
})

