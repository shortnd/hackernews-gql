const { getUserById } = require('../utils');
const { Link, User } = require('../db');

async function feed(parent, args, context, info) {
  return await Link.find({});
}

async function me(parent, args, context, info) {
  try {
    const userId = await getUserById(context);
    const user = await User.findById(userId);
    return user;
  } catch (e) {
    console.error(e);
    return {};
  }
}

module.exports = {
  feed,
  me
}
