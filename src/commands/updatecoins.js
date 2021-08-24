const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');

module.exports = {
    name: 'updatecoins',
    description: 'updates coins of a user',
    async execute(message, client, Discord, fetch, args) {
        if (message.author.id == "462223589043863562") {
            const userToFind = args[0].toString();
            const coinNum = args[1];
            console.log(userToFind);
            console.log(coinNum);
            const coin = await userSchema.findOneAndUpdate({ userId: userToFind }, { coins: coinNum });
            console.log(coin);
            message.reply(`They have ${coin.coins} coins!`)
        } else {
            message.channel.send("You dont have perms to use that command.");
        }

    }
}