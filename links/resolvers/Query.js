const { Link } = require('../../db');

async function feed(parent, args, context) {
  try {
    const links = await Link.find({});
    return links;
  } catch (e) {
    console.error(e);
    return [];
  }
}

module.exports = {
  feed
}
