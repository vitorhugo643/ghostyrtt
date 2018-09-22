const Discord = require("discord.js");
const client = new Discord.Client(); 
const config = require("./config.json"); 

client.on('ready', () =>{
    let status = [
        {name: 'Ajuda?│/ajuda', type: 'STREAMING', url: 'https://twitch.tv/srmisterii'},
        {name: 'heart_eyesNighty » Communityheart_eyes', type: 'LISTENING'},
        {name: 'winkSteamwink', type: 'PLAYING'},
        {name: 'Sr.Misterii│YouTube', type: 'WATCHING'},
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
client.on('message', message => {
    if (message.content.startsWith('ajuda')){
        message.channel.send('Estou em desenvolvimento, então quando adicionar comandos, meu criador avisara.\nCriador: NitrooPVP#4025.');
    }
    if (message.content.startsWith('comandos')){

        message.channel.send('${member.author}, comandos enviado no seu privado.');

message.author.send('${member.author},\n \n \n \nOlá, aqui está os comandos\n \n/ajuda\n \n/comandos\n \n/criador\n \nAinda vamos adicionar mais comandos!')
}
    if (message.content.startsWith('criador')){
        message.channel.send('Meu criador: NitrooPVP#4025.');
    }
});

client.login(process.env.BOT_TOKEN);
