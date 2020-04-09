const jwt = require('jsonwebtoken');
const APP_SECRET = 'SOMETHING_SECRET';

function getUserById(context) {
  const Authorization = context.authorization;
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error('Not autheticated');
}

module.exports = {
  APP_SECRET,
  getUserById
}
