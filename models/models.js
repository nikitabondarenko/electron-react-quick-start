const mongoose = require('mongoose');

const User = mongoose.model("User", {
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  firstname: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
  documentsOwned: {
    type: Array, //array of document id's that User has created
    require: true
  },
  documentsCanEdit: {
    type: Array, //array of document id's that have been shared with User
    require: true
  }
})

const Document = mongoose.model("Document", {
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
const models = {User: User, Document: Document}
module.exports = models;
