const { Link } = require('../db');

async function feed(parent, args, context, info) {
  return await Link.find({});
}

module.exports = {
  feed
}
