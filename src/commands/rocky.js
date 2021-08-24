module.exports = {
    name: 'rocky',
    description: 'sends rocky gifs!',
    execute(message, client, Discord, fetch, args){
        var randomNum = Math.floor(Math.random() * 2) + 1;
        if(randomNum == 1){
            message.channel.send('https://cdn.discordapp.com/emojis/860875154330484746.gif?v=1');
        } else if (randomNum == 2){
            message.channel.send('https://cdn.discordapp.com/emojis/861551933025419294.gif?v=1');
        }   
    }

}