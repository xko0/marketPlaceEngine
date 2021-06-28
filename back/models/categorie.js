const mongoose = require("mongoose");

const cardResume = mongoose.Schema({
    nom: {
      type: String,
      required: false
    }
});
module.exports = mongoose.model("Card", cardResume);