const mongoose = require("mongoose");

const pingSchema = new mongoose.Schema({
    ping: {
        type: Date, default: Date.now 
    }
})

module.exports = mongoose.model('Ping', pingSchema);