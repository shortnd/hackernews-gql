const { User, Link } = require('../db');

async function links(parent, args, context) {
  const user = await User
    .findById(parent.id)
    .populate('links')
    .exec();;
  return user.links;
}

module.exports = {
  links,
}
