const { getUserById } = require('../utils');
const { Link, User } = require('../db');

const { feed } = require('../links/resolvers/Query');
const { me } = require('../users/resolvers/Query');

const Query = {
  // Links
  feed,
  // User
  me
}



module.exports = Query
