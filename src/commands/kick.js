module.exports = {
    name: 'kick',
    description: 'it kicks.',
    execute(message, client, Discord, fetch, args){
        const mention = message.mentions.members.first();
        if(!message.member.hasPermission('KICK_MEMBERS')){
            message.reply("You dont have perms to kick.")
        } else if (message.member.hasPermission('KICK_MEMBERS')){
            if(mention){
                const memberTarget = message.guild.members.cache.get(mention.id);
                if(memberTarget.kickable){
                    memberTarget.kick();
                    message.channel.send(`${memberTarget} has been kicked.`);
                } else {
                    message.reply(`I cant kick ${memberTarget}`)
                }
            } else {
                message.channel.send("Mention a user maybe?");
            }
        }
    }
}