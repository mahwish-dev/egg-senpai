module.exports = {
    name: 'about',
    description: 'shows bot information',
    execute(message, client, Discord, fetch, args) {
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle("About the bot!")
            .setDescription("**About:** Egg Senpai is a bot that brings many useful perks to your server!\nDo e!help to get it's commands!\n\n**Support Server:** https://discord.gg/P4VHmep455 ")
            .setThumbnail("https://drive.google.com/uc?id=1NpPWl9VbXz8ESaTNekTTtmLpmrmL5C8v");
        message.channel.send(embed);
    }
}