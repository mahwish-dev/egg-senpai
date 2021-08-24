module.exports = {
    name: 'ban',
    description: 'it bans.',
    execute(message, client, Discord, fetch, args){
        const mention = message.mentions.members.first();
        if(!message.member.hasPermission('BAN_MEMBERS')){
            message.reply("You dont have perms to ban.")
        } else if (message.member.hasPermission('BAN_MEMBERS')){
            if(mention){
                const memberTarget = message.guild.members.cache.get(mention.id);
                if(memberTarget.bannable){
                    memberTarget.ban();
                    message.channel.send("User has been banned");
                } else {
                    message.reply("I cant ban that member.")
                }
                
            }else{
                message.channel.send("Mention a user maybe?");
            }
        }
    }
}