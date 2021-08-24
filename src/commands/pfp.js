module.exports = {
    name: 'pfp',
    description: 'shows your/someone else\'s pfp',
    execute(message, client, Discord, fetch, args){
        const mention = message.mentions.users.first();
        let member = mention || message.author;

        let avatar = member.displayAvatarURL({dynamic: true, size: 1024});

        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.username}'s avatar`)
        .setImage(avatar)
        .setColor("RANDOM")

        message.channel.send(embed);
    }
}