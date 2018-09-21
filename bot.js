const Discord = require('discord.js');
const bot = new Discord.Client();


bot.on('ready', () => {
    let status = [
        {name: 'fui desenvolvido pelo NitrooPVP#4025', type: 'STREAMING', url: 'https://twitch.tv/srmisterii'},
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
    if (message.content === 'Oi') {
    	message.reply('Olá, tudo bem ?');
    }
    if (message.content === 'ping'){
        message.reply('pong');
  	}
    if (message.content.startsWith('/ajuda')){
        message.channel.send('Para saber meus comandos é /comandos.\nPara ver meu criador /criador.\nEstou em desenvolvimento, então não tenho muitos comandos.');
    }
    if (message.content.startsWith('/comandos)){
        message.channel.send('/comandos\n/criador');
    }
});
    
// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
