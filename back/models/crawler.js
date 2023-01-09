const mongoose = require("mongoose");

const scrappedLink = mongoose.Schema({
    lien: {
      type: String,
      required: false
    }
});
module.exports = mongoose.model("Crawler", scrappedLink);