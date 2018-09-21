const Discord = require('discord.js');
const bot = new Discord.Client();


bot.on('ready', () => {
    let status = [
        {name: 'em desenvolvimento.', type: 'STREAMING', url: 'https://twitch.tv/srmisterii'},
      ];
      
      //STREAMING = Transmitindo
      //LISTENING = Ouvindo
      //PLAYING = Jogando
      //WATCHING = Assistindo
      
        function setStatus() {
            let randomStatus = status[Math.floor(Math.random() * status.length)];
            bot.user.setPresence({game: randomStatus});
        }
      
        setStatus();
        setInterval(() => setStatus(), 10000);  //10000 = 10Ms = 10 segundos
    console.log('Logado');
});
bot.on('message', message => {
    if (message.content.startsWith('/ajuda')){
        message.channel.send('Estou em desenvolvimento, então quando adicionar comandos, meu criador avisara.\nCriador: NittroPVP#4025.');
    }
});
    
// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
