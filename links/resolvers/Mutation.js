const { User, Link } = require('../../db');
const { getUserById } = require('../../utils');

async function addLink(parent, { url, description }, context, info) {
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
  addLink,
  updateLink,
  deleteLink
}
