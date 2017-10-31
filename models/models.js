const mongoose = require(‘mongoose’);

const User = mongoose.model(“User”, {
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
  },
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  documentsOwned: {
    type: Array, //array of document id's that User has created
    require: true;
  },
  documentsCanEdit: {
    type: Array, //array of document id's that have been shared with User
    require: true;
  }
})

const Document = mongoose.model(“Document”, {
  title: {
    type: String,
    require: true,
  },
  rawText: {
    type: String,
    require: true,
  },
  owner: {
    type: Array,
    require: true,
  },
  sharedWith: {
    type: Array,
    require: true,
  }
})

module.exports = models;
