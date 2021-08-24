const mongoose = require("mongoose");

const welcomeSchema = new mongoose.Schema({
    welcomeChannel: {
        type: String,
        require: true,
    },
    welcomeMssg: {
        type: String,
        require: true
    },
    welcomeRole: {
        type: String
    },

})

module.exports = mongoose.model('welcome', welcomeSchema);