const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    leaveChannel: {
        type: String,
    },
    leaveMssg: {
        type: String,
    },
})

module.exports = mongoose.model('leave', leaveSchema);