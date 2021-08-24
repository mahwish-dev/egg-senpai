module.exports = {
    name: 'kiss',
    description: 'kiss someone!',
    execute(message, client, Discord, fetch, args){
        const mention = message.mentions.members.first();
        if(mention){
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Kiss :D")
            .setDescription(`${message.author} kisses ${mention}`)
            fetch(`https://api.tenor.com/v1/random?key=CYQRSPSE0DC1&q=anime+kiss&limit=10`)
            .then(res => res.json())
            .then(json => {
                embed.setImage(json.results[0].media[0].gif.url);
                message.channel.send(embed);
            })
        } else {
            message.reply("You need a kiss bro?")
        }
    }
}