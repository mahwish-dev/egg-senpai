const mongoose = require('mongoose');


module.exports = {
    name: 'say',
    description: 'make the bot say something',
    async execute(message, client, Discord, fetch, args){
        const guildMongo = require('../../src/schemas/guildSchema');
        const prefixDB = await guildMongo.findOne({guildId: message.guild.id}).catch(err => console.log(err));     
        const prefix = prefixDB.guildPrefix;
        const currentYear = new Date().getFullYear();
        if (message.author.bot) return;
        const SayMessage = message.content.slice(prefix.length + 3).trim();
        message.channel.send(`\"${SayMessage}\"\n - ${message.author}, ${currentYear}.`);
    }
}