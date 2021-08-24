const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildName: mongoose.SchemaTypes.String,
    guildId: {
        type: String,
        require: true,
    },
    guildPrefix: {
        type: String,
        default: "e!",
        require: true,
    }
})

module.exports = mongoose.model('Guilds', guildSchema);