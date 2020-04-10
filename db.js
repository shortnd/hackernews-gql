const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/hackernews-gql', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const LinkSchema = new mongoose.Schema({
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

const Link = new mongoose.model('Link', LinkSchema);

const UserSchema = new mongoose.Schema({
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

const User = new mongoose.model('User', UserSchema);


module.exports = {mongoose, Link, User};
