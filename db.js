const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/hackernews-gql", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const LinkSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: "Description is required",
    },
    url: {
      type: String,
      required: "URL is required",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vote",
      },
    ],
  },
  {
    timestamps: true,
  }
);

LinkSchema.pre("remove", async function (next) {
  const user = await User.findById(this.postedBy);
  await user.links.remove(this.id);
  next();
});

const Link = new mongoose.model("Link", LinkSchema);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: "You seem to already have an account",
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    links: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Link",
      },
    ],
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vote",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("remove", async function (next) {
  // console.log(this.)
  next();
});

const User = new mongoose.model("User", UserSchema);

const VoteSchema = new mongoose.Schema(
  {
    link: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requiredPaths: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vote = new mongoose.model("Vote", VoteSchema);

module.exports = { mongoose, Link, User, Vote };
