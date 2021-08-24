require("dotenv").config();

const Discord = require('discord.js');
const fetch = require('node-fetch');
const client = new Discord.Client();
const fs = require('fs');
const mongoose = require('mongoose');
const guildMongo = require('./schemas/guildSchema');
const userMongo = require('./schemas/userSchema');

//mongodb connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((m) => console.log("connected to db"))
    .catch((err) => console.log(err));

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const cmd = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(cmd.name, cmd);
}




const chat = ["im going to sex you", "mayonnaise is spicy", "how to get embed perms", "f", "shut up eegy", "prefix"]
client.on('message', async message => {
    if (message.author.bot) return;
    const prefixDB = await guildMongo.findOne({ guildId: message.guild.id }).catch(err => console.log(err));

    const prefix = prefixDB.guildPrefix;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (client.commands.has(command) && message.content.startsWith(prefix + command)) {
        try {
            client.commands.get(command).execute(message, client, Discord, fetch, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    } else if (client.commands.has(command) && message.content.startsWith(prefix)) {
        message.reply("Try doing `e!<cmd>` rather than `e! <cmd>`");
    } else if (chat.includes(message.content)) {

        if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

        const dumbQ = ["im going to sex you", "mayonnaise is spicy", "how to get embed perms"];

        if (dumbQ.includes(message.content)) {
            message.reply('fucktard');
        } else if (message.content == ("f" || "F")) {
            message.channel.send(`${message.author} has paid their respects.`)
        } else if (message.content == "shut up egg") {
            message.channel.send("no u >:(");
        }

    } else if (message.content.startsWith(prefix)) {
        message.reply("that isnt a valid command");
    }

});



client.on('guildMemberAdd', async guildMember => {
    //send whalecum mssg
    if (guildMember.guild.id === '866213137454858241') {
        console.log('hello')
        console.log(`${guildMember.user.username} joined the server`)
        const Embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`**${guildMember.user.username}** just joined the server`)
        client.channels.cache.get("866216392226897951").send(Embed);

        //add member role

        if (guildMember.guild.id === "866213137454858241") {
            var role = guildMember.guild.roles.cache.find(role => role.id === "866216104131952660");
            guildMember.roles.add(role);
        }
    }
});

client.on('guildCreate', async guild => {
    const newGuild = await guildMongo.create({
        guildName: guild.name,
        guildId: guild.id
    })
});

client.on('ready', async() => {

    const clientUsers = await client.users.cache.size;
    const clientGuilds = await client.guilds.cache.size

    const Embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("Got the bot online! Sorry for any inconvience.")
    client.channels.cache.get("866214037909667861").send(Embed);
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: 'dnd',
        activity: {
            name: clientUsers + " users  in " + clientGuilds + " servers",
            type: "WATCHING"

        }
    });
});

client.login(process.env.BOT_TOKEN);