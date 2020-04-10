const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

const { mongoose } = require("./db");
const Subscription = require("./resolvers/Subscription");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");

const resolvers = {
  Subscription,
  Query,
  Mutation,
  User,
  Link,
  Vote,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, connection }) => {
    if (connection) {
      return { ...connection.context };
    } else {
      return { ...req.headers };
    }
  },
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connecton error"));
db.once("open", () => {
  server
    .listen({
      port: process.env.PORT || 4000,
    })
    .then(({ url }) => {
      console.log(`Sever listening on ${url}`);
    });
});
