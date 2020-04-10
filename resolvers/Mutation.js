const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Link } = require('../db');
const { APP_SECRET, getUserById } = require('../utils');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await User.create({
    ...args,
    password
  })

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  }
}

async function login(parent, { email, password }, context, info) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid Error')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  }
}

async function post(parent, { url, description }, context, info) {
  const userId = getUserById(context);
  const link =  await Link.create({
    url,
    description,
    postedBy: userId
  });
  const user = await User.findById(userId);
  await user.update({
    links: [...user.links, link.id]
  })
  return link;
}

async function updateLink(parent, args, context, info) {
  const linkPromise = Link.findById(args.id);
  const userIdPromise = getUserById(context);
  let [link, userId] = await Promise.all([linkPromise, userIdPromise]);
  if (userId != link.postedBy) {
    throw new Error('You can not edit this link');
  }
  Object.keys(args).forEach(key => {
    link[key] = args[key]
  })
  await link.save();
  return link;
}

async function deleteLink(parent, args, context) {
  const linkPromise = Link.findById(args.id);
  const userIdPromise = getUserById(context);
  const [link, userId] = await Promise.all([linkPromise, userIdPromise]);
  if (link.postedBy != userId) {
    throw new Error('You can not delete this link');
  }
  await link.remove();
  return link;
}

module.exports = {
  signup,
  login,
  post,
  updateLink,
  deleteLink
}
