const mongoose = require('mongoose');

const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'changetextname',
    description: 'changes text channel name',
    async execute(message, client, Discord, fetch, args){
        const guildMongo = require('../../src/schemas/guildSchema');
        const prefixDB = await guildMongo.findOne({guildId: message.guild.id}).catch(err => console.log(err));     
        const prefix = prefixDB.guildPrefix;
        if(!args[0])return message.reply('Insufficent arguments.')
        if(message.member.hasPermission('MANAGE_CHANNELS')){
            const nameOfChannel = message.content.slice("changetextname".length + prefix.length).trim();
            console.log(nameOfChannel);
            message.channel.setName(nameOfChannel)
            .then(newChannel => {
                const embed = new MessageEmbed()
                .setTitle('Success!')
                .setColor("RANDOM")
                .setDescription(`Channel name has been changed to ${nameOfChannel}`)
                .setTimestamp();

                message.channel.send(embed);
            })
            .catch(console.error);

            
        } else {
            message.reply("you dont have perms to change channel names.");
        }
    }
}