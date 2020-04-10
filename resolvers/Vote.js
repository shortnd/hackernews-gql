const { Link, User } = require("../db");

async function link(parent, args, context) {
  const link = await Link.findById(parent.link);
  return link;
}

async function user(parent, args, context) {
  const user = await User.findById(parent.user);
  return user;
}

module.exports = {
  link,
  user,
};
