var mongoose = require('mongoose');

var connect = process.env.MONGODB_URI || require('./connect');
mongoose.connect(connect);

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
    },
    documentsOwned: {
      type: Array, //array of document id's that User has created
      require: true
    },
    documentsCanEdit: {
      type: Array, //array of document id's that have been shared with User
      require: true
    }
  });

  const documentSchema = new Schema ({
    rawText: {
      type: String,
      require: true
    },
    owner: {
      type: String,
      require: true
    },
    sharedWith: {
      type: Array,
      require: true
    }
  })

  var User = mongoose.model('User', userSchema);
  var Document = mongoose.model('Document', documentSchema);

  module.exports = {
    User: User,
    Document: Document
  };
  
