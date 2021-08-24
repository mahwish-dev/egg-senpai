const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	async execute(message, client, Discord, fetch, args) {
		const { commands } = message.client;

        const guildMongo = require('../../src/schemas/guildSchema');
        const prefixDB = await guildMongo.findOne({guildId: message.guild.id}).catch(err => console.log(err));     
        const prefix = prefixDB.guildPrefix;

		if (!args.length) {
		    const cmds = commands.map(command => command.name);

            
            var perChunk = 5;

            var inputArray = cmds;    

            var result = inputArray.reduce((resultArray, item, index) => { 
                    const chunkIndex = Math.floor(index/perChunk)
        
                    if(!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = [] // start a new chunk
                    }
        
                    resultArray[chunkIndex].push(item)
        
                    return resultArray
                    }, [])

            let pages = result;
            let page = 1 

            const embed = new Discord.MessageEmbed() // Define a new embed
            .setTitle('Help')
            .setColor('RANDOM') // Set the color
            .setFooter(`Page ${page} of ${pages.length}`)
            .setDescription(result[page - 1].join('\n') + `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)

            message.channel.send({embed}).then(msg => {
            msg.react('⬅').then( r => {
                msg.react('➡')

                // Filters
                const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id
                const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id

                const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000})
                const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000})

                backwards.on('collect', (r, u) => {
                    if (page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                    page--
                    embed.setDescription(result[page - 1].join('\n') + `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
                    embed.setFooter(`Page ${page} of ${pages.length}`)
                    msg.edit(embed)
                    r.users.remove(r.users.cache.filter(u => u === message.author).first())
                })

                forwards.on('collect', (r, u) => {
                    if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                    page++
                    embed.setDescription(result[page - 1].join('\n') + `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
                    embed.setFooter(`Page ${page} of ${pages.length}`)
                    msg.edit(embed)
                    r.users.remove(r.users.cache.filter(u => u === message.author).first());
                })
            })
            })

            return;

	    }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        const data = new Discord.MessageEmbed()
        .setTitle(command.name)
        .setDescription(command.description)
        .setTimestamp()

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        message.channel.send(data);

}}