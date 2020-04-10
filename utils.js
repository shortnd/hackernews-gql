const { PubSub } = require("apollo-server");

const jwt = require("jsonwebtoken");
const APP_SECRET = "SOMETHING_SECRET";
const LINK_ADDED = "LINK_ADDED";
const VOTE_ADDED = "VOTE_ADDED";

const pubsub = new PubSub();

function getUserById(context) {
  const Authorization = context.authorization;
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not autheticated");
}

module.exports = {
  APP_SECRET,
  getUserById,
  LINK_ADDED,
  VOTE_ADDED,
  pubsub,
};
