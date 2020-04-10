const { User } = require('../../db');
const { getUserById } = require('../../utils');

async function me(parent, args, context) {
  try {
    const userId = await getUserById(context);
    return await User.findById(userId);
  } catch (e) {
    console.log(e);
    return {};
  }
}

module.exports = {
  me
}
