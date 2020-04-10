const { newLink } = require("../links/resolvers/Subscription");
const { newVote } = require("../votes/resolvers/Subscription");

const Subscription = {
  newLink,
  newVote,
};

module.exports = Subscription;
