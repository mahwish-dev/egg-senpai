module.exports = {
    name: 'serverinfo',
    description: 'shows server info',
    execute(message, client, Discord, fetch, args){
        const { guild, channel } = message

        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Server Info for ${guild.name}`)
        .addFields(
            {
                name: "Server Name",
                value: guild.name
            },
            {
                name: "Created At",
                value: new Date(guild.createdAt).toLocaleDateString()
            },
            {
                name: "Owner",
                value: guild.owner
            },
            {
                name: "Region",
                value: guild.region
            },
            {
                name: "Roles",
                value: guild.roles.cache.size - 1
            }
        )
        message.channel.send(embed);
    }
}