const { Link } = require("../../db");

async function feed(parent, args, context) {
  let f, option;
  if (args.orderBy) {
    [f, option] = args.orderBy.split("_");
  }
  const where = args.filter
    ? {
        $or: [
          {
            url: {
              $regex: `.*${args.filter}.*`,
              $options: "i",
            },
          },
          {
            description: {
              $regex: `.*${args.filter}.*`,
              $options: "i",
            },
          },
        ],
      }
    : {};
  try {
    const linksPromise = Link.find(where)
      .skip(args.skip)
      .limit(args.limit)
      .sort({ [f]: option });
    const countPromise = Link.find(where).count();
    const [links, count] = await Promise.all([linksPromise, countPromise]);
    return {
      links,
      count,
    };
  } catch (e) {
    console.error(e);
    return [];
  }
}

module.exports = {
  feed,
};
