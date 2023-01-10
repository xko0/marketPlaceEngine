const mongoose = require("mongoose");

const scrappedLink = mongoose.Schema({

  Title: {
    type: String,
    required: false,
    default: 'NC'
  },
  profilePicture: {
    type: String,
    required: false,
    default: 'NC'
  },
  content: {
    type: String,
    required: false,
    default: 'NC'
  },
  lien: {
    type: String,
    required: false,
    default: 'NC'
  }
});
module.exports = mongoose.model("Crawler", scrappedLink);