const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');

module.exports = {
    name: 'bal',
    description: 'tells how many egglets u have',
    async execute(message, client, Discord, fetch, args) {
        const coin = await userSchema.find({ userId: message.author.id }).catch(err => console.log(err));
        if (coin.length) {
            console.log(coin);
            message.reply(`You have ${coin[0].coins} egglets!`)
        } else {
            const newUser = await userSchema.create({
                userName: message.author.username,
                userId: message.author.id
            }).catch(err => console.log(err))
            message.reply(`You have ${coin[0].coins} egglets!`)
        }
    }
}