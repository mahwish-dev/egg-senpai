const mongoose = require('mongoose');
const pingMongo = require('../schemas/pingSchema');


module.exports = {
    name: 'ping',
    description: 'it pings.',
    async execute(message, client, Discord, fetch, args){
        const dbping = await pingMongo.create({
            ping: Date.now()
        });

        const embed = new Discord.MessageEmbed()
        .setTitle('Pong.')
        .setDescription(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms \n💻 API Latency is ${Math.round(client.ws.ping)}ms \n🌐 Database latency is ${Date.now() - dbping.ping}ms`)
        .setTimestamp()
        message.channel.send(embed);

    }
}