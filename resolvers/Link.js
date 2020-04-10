const { Link, User } = require("../db");

async function postedBy(parent) {
  return await User.findById(parent.postedBy);
}

async function votes(parent) {
  const link = await Link.findById(parent.id).populate("votes");
  return link.votes;
}

module.exports = {
  postedBy,
  votes,
};
