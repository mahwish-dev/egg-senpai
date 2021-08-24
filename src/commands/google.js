module.exports = {
    name: 'google',
    description: 'searches google :D',
     execute(message, client, Discord, fetch, args){
        if(args.length > 0){
        google = async() =>{
        return result = fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDCTXhZxc9FlncqHzlFT16LbFNP7-EO9xU&cx=1b351174e7f142627&q=${args.join("%20")}`)
        .then(async res => {
            const result = await res.json()

            const embed = new Discord.MessageEmbed()
            .setTitle(args.join(" "))
            .setURL(result.items[0].link)
            .setFooter('Powered by Google.')
            .setDescription(result.items[0].snippet)

            if(result.items[0].pagemap.cse_thumbnail)embed.setImage(result.items[0].pagemap.cse_thumbnail[0].src);

            message.channel.send(embed);
        })} 
    google();} else {
        message.reply('Please provide a query to search for.')
    }

    }
}