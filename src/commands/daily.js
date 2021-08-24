const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');

module.exports = {
    name: 'daily',
    description: 'a daily command that gives u 500 egglets!',
    async execute(message, client, Discord, fetch, args) {
        const userCoin = await userSchema.find({ userId: message.author.id }).catch(err => console.log(err));
        if (userCoin.length) {
            if (userCoin[0].dailyDate) {
                if (Date.now() - userCoin[0].dailyDate >= 86400000) {
                    const a = await userSchema.findOneAndUpdate({ userId: message.author.id }, { coins: userCoin[0].coins + 500, dailyDate: Date.now() });
                    message.reply('Added 500 egglets.');
                } else {
                    message.reply(`It has not been a day since you have claimed your daily.`)
                }
            } else {
                const b = await userSchema.findOneAndUpdate({ userId: message.author.id }, { $set: { dailyDate: Date.now() } })
                const c = await userSchema.findOneAndUpdate({ userId: message.author.id }, { coins: userCoin[0].coins + 500 });
                message.reply('Added 500 egglets.');
            }
        } else {
            const newUser = await userSchema.create({
                userName: message.author.username,
                userId: message.author.id,
                dailyDate: Date.now()
            }).catch(err => console.log(err));
            const e = await userSchema.find({ userId: message.author.id }).catch(err => console.log(err));
            const d = await userSchema.findOneAndUpdate({ userId: message.author.id }, { coins: e[0].coins + 500 });
            message.reply('Added 500 egglets.');
        }
    }
}