const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: mongoose.SchemaTypes.String,
    userId: {
        type: String,
        require: true,
        unique: true
    },
    coins: {
        type: Number,
        default: 10000
    },
    dailyDate: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Users', userSchema);