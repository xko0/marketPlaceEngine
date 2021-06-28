const mongoose = require("mongoose");

const cardResume = mongoose.Schema({
    titre: {
      type: String,
      required: true
    },
    resumeMarketPlace: {
      type: String,
      required: true
    },
    anneeCreation: {
      type: Number,
      required: false
    },
    localisation: {
      type: String,
      required: true
    },
    leveeFonds: {
      type: Number,
      required: false
    },
    categorie: {
      type: String,
      required: true
    },
    urlMarketPlace: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    imgSite1: {
      type: String,
      required: true
    },
    imgSite2: {
      type: String,
      required: true
    },
    imgSite3: {
      type: String,
      required: true
    }
});
module.exports = mongoose.model("Card", cardResume);