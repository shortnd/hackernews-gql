const { User } = require('../db');

async function links(parent, args, context) {
  const user = await User.findById(parent.id).populate('links').exec();
  return user;
}

module.exports = {
  links,
}
