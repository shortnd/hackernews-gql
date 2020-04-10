const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Link } = require("../db");
const { APP_SECRET, getUserById } = require("../utils");

const { signup, login } = require("../users/resolvers/Mutation");
const {
  addLink,
  updateLink,
  deleteLink,
} = require("../links/resolvers/Mutation");
const { vote } = require("../votes/resolvers/Mutation");

const Mutation = {
  // Users
  signup,
  login,
  // Links
  addLink,
  updateLink,
  deleteLink,
  // Votes
  vote,
};

module.exports = Mutation;
