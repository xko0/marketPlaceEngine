const mongoose = require('mongoose')

const proposition = mongoose.Schema({
    titre: {
        type: String,
        required: false
    },
    resumeMarketPlace: {
        type: String,
        required: false
    },
    urlMarketPlace: {
        type: String,
        required: false
    },
    localisation: {
        type: String,
        required: false
    },
    anneeCreation: {
        type: Number,
        required: false
    },
    comments: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("Proposition", proposition);