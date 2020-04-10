const { User, Link } = require('../db');

async function links(parent, args, context) {
  const links = await Link.where({ postedBy: parent.id })
  return links;
}

module.exports = {
  links,
}
