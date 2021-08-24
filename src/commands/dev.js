module.exports = {
    name: 'dev',
    description: 'it tells about the dev',
    execute(message, client, Discord, fetch, args){(async()=>{
        const owner = client.users.fetch('462223589043863562');
        const ownerTag = ((await owner).username) + "#" + ((await owner).discriminator);

        message.channel.send(`eggy is the dev of this chad ass bot. \nDiscord: ${ownerTag}`);
    })();

        
    }

}