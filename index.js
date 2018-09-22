const Discord = require('discord.js');
const client = new Discord.Client();

 
client.on('ready', () => {
  let status = [
        {name: 'Ajuda?│a/juda', type: 'STREAMING', url: 'https://twitch.tv/srmisterii'},
        {name: 'Tuê » Communityheart_eyes', type: 'LISTENING'},
        {name: 'winkSteamwink', type: 'PLAYING'},
        {name: 'NitrooPVP│YouTube', type: 'WATCHING'},
      ];
      
      //STREAMING = Transmitindo
      //LISTENING = Ouvindo
      //PLAYING = Jogando
      //WATCHING = Assistindo
      
        function setStatus() {
            let randomStatus = status[Math.floor(Math.random() * status.length)];
            client.user.setPresence({game: randomStatus});
        }
      
        setStatus();
        setInterval(() => setStatus(), 10000);  //10000 = 10Ms = 10 segundos
});
    console.log('Logado');
});
client.on('message', message => {
    if (message.content.startsWith('/ajuda')){
        message.channel.send('Estou em desenvolvimento, então quando adicionar comandos, meu criador avisara.\nCriador: NitrooPVP#4025.');
    }
    if (message.content.startsWith('/comandos')){

        message.channel.send('${member.author}, comandos enviado no seu privado.');

message.author.send('${member.author},\n \n \n \nOlá, aqui está os comandos\n \n/ajuda\n \n/comandos\n \n/criador\n \nAinda vamos adicionar mais comandos!')
}
    if (message.content.startsWith('/criador')){
        message.channel.send('Meu criador: NitrooPVP#4025.');
    }
});
client.on('message', message => {
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
    
client.login(process.env.BOT_TOKEN);
