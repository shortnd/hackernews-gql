const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/hackernews-gql', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const Link = new mongoose.model('Link', {
  description: {
    type: String,
    required: 'Description is required'
  },
  url: {
    type: String,
    required: 'URL is required'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const User = new mongoose.model('User', {
  name: {
    type: String,
    required: 'Name is required'
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: 'You seem to already have an account',
    index: true
  },
  password: {
    type: String,
    required: true
  },
  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Link'
    }
  ]
})


module.exports = {mongoose, Link, User};
