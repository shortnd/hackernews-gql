const { Link } = require('../db');

async function postedBy(parent) {
  const link = await Link.findById(parent.id).populate('postedBy').exec();
  console.log(link.postedBy.name);
  return link;
}

module.exports = {
  postedBy
}
