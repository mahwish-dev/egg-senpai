module.exports = {
    name: 'hug',
    description: 'hug someone!',
    execute(message, client, Discord, fetch, args) {
        const mention = message.mentions.members.first();
        if (mention) {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Hugs :D")
                .setDescription(`${message.author} hugs ${mention}`)
            fetch(`https://api.tenor.com/v1/random?key=${process.env.TENOR_KEY}&q=anime+hug&limit=10`)
                .then(res => res.json())
                .then(json => {
                    embed.setImage(json.results[0].media[0].gif.url);
                    message.channel.send(embed);
                })
        } else {
            message.reply("Mention someone to hug lmaoo.")
        }
    }
}