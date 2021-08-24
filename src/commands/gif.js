const fetch = require('node-fetch');
const mongoose = require('mongoose');

module.exports = {
    name: 'gif',
    description: 'searches for a gif on tenor!',
    async execute(message, client, Discord, fetch, args) {

        const guildMongo = require('../../src/schemas/guildSchema');
        const prefixDB = await guildMongo.findOne({ guildId: message.guild.id }).catch(err => console.log(err));
        const prefix = prefixDB.guildPrefix;

        const gifName = message.content.slice(prefix.length + 3).trim().replace(" ", "+");
        if (!gifName) {
            message.reply("enter a query to search!");
        } else {

            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
            fetch(`https://api.tenor.com/v1/random?key=${process.env.TENOR_KEY}&q=${gifName}&limit=10`)
                .then(res => res.json())
                .then(json => {
                    if (json.results[0]) {
                        embed.setImage(json.results[0].media[0].gif.url);
                        message.channel.send(embed)
                    } else {
                        message.reply("Couldnt find gifs for that query.")
                    }
                })
        }
    }
}