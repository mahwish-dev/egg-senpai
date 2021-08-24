const mongoose = require('mongoose');
const guildSchema = require('../schemas/guildSchema');

module.exports = {
    name: 'changeprefix',
    description: 'change ur server prefix',
    async execute(message, client, Discord, fetch, args){
        const prefix = await guildSchema.findOneAndUpdate({guildId: message.guild.id}, {guildPrefix: args[0]}, {new: true}).catch(err => console.log(err));
        
        console.log(prefix.guildPrefix);

        const embed = new Discord.MessageEmbed()
        .setTitle('Changed Prefix!')
        .setDescription(`Prefix changed to ${prefix.guildPrefix}`)
        .setTimestamp();

        message.channel.send(embed);
    }
}