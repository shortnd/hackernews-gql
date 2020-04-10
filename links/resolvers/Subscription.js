const { pubsub, LINK_ADDED } = require("../../utils");

const newLink = {
  subscribe: () => pubsub.asyncIterator([LINK_ADDED]),
};

module.exports = {
  newLink,
};
