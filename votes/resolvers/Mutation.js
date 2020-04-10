const { Vote } = require("../../db");
const { getUserById } = require("../../utils");
const { VOTE_ADDED, pubsub } = require("../../utils");

async function vote(parent, args, context, info) {
  const userId = await getUserById(context);
  const voteExist = await Vote.findOne({
    user: {
      $in: userId,
    },
    link: {
      $in: args.linkId,
    },
  });
  if (voteExist) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  const vote = await Vote.create({
    user: userId,
    link: args.linkId,
  });
  pubsub.publish(VOTE_ADDED, { newVote: vote });
  return vote;
}

module.exports = {
  vote,
};
