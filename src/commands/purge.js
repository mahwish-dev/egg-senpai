module.exports = {
    name: 'purge',
    description: 'bulk delete mssgs',
    execute(message, client, Discord, fetch, args){
        const amount = args[0];

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('you need to input a number between 1 and 99.');
        }

        message.channel.bulkDelete(amount, true).then(deletedMessages => {
            // Filter the deleted messages with .filter()
            var botMessages = deletedMessages.filter(m => m.author.bot);
            var userPins = deletedMessages.filter(m => m.pinned);
            var userMessages = deletedMessages.filter(m => !m.author.bot);

            const embed = new Discord.MessageEmbed()
                .setTitle("Success")
                .setColor("RANDOM")
                .setTimestamp()
                .addField("Bot Messages Purged", botMessages.size, false)
                .addField("User Pins Purged", userPins.size, false)
                .addField("User Messages Purged", userMessages.size, false)
                .addField("Total Messages Purged", deletedMessages.size, false);

            message.channel.send(embed);
    }).catch(err => {
        console.error(err);
        message.channel.send("there was an error.")
    })
}}