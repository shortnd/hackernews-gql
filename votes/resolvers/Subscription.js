const { pubsub, VOTE_ADDED } = require("../../utils");

const newVote = {
  subscribe: () => pubsub.asyncIterator([VOTE_ADDED]),
};

module.exports = {
  newVote,
};
