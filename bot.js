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
        message.channel.send('Estou em desenvolvimento, então quando adicionar comandos, meu criador avisara.\nCriador: NitrooPVP#4025.');
    }
    if (message.content.startsWith('/comandos')){
        message.channel.send('/comandos | /ajuda\nAssim que meu criador coloca mais comandos, é só da /comandos para ver os novos.');
    }
});
bot.on('message', message => {
    let arraymsg = message.content.split(" ");
let cmd = arraymsg[0].toLowerCase()
let args = message.content.split(" ").slice(1)
    if(cmd === '/ban'){
        const args = message.content.split(" ").slice(1);
        var razao = args.slice(1).join(" ")
            var membro = message.mentions.members.first();
            if(!message.member.hasPermissions("BAN_MEMBERS")) return message.reply("você não tem permissão de usar esse comando")
            if(!membro) return message.reply("você não mencinou ninguém")
            if(!membro.bannable) return message.reply("Você não pode banir essa pessoa")
            if(razao.length < 1) return message.reply("Coloque um motivo!")
            membro.ban()
            message.channel.send(`O membro ${membro.user.username} foi banido do servidor.\nMotivo: ${razao}`)
      }
});
    
// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
