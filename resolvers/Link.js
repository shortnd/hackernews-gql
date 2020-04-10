const { Link, User } = require('../db');

async function postedBy(parent) {
  return await User.findById(parent.postedBy);
}

module.exports = {
  postedBy
}
