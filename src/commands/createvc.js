const mongoose = require('mongoose');

module.exports = {
    name: 'createvc',
    description: 'create a vc!',
    async execute(message, client, Discord, fetch, args){
      const guildMongo = require('../../src/schemas/guildSchema');
      const prefixDB = await guildMongo.findOne({guildId: message.guild.id}).catch(err => console.log(err));     
      const prefix = prefixDB.guildPrefix;
        if(message.member.hasPermission('MANAGE_CHANNELS')){
        let channelName = message.content.slice('createvc'.length + prefix.length).trim(); //Arguments to set the channel name
        message.guild.channels.create(channelName, {
        type: "voice", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
        permissionOverwrites: [
           {
             id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
             allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
             deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
		   }
        ],
      })
      const embed = new MessageEmbed()
                .setTitle('Success!')
                .setColor("RANDOM")
                .setDescription(`Channel has been created: ${channelName}`)
                .setTimestamp();

                message.channel.send(embed);
    } else {
      message.reply("you dont have perms to change channel names.");
    }
}}