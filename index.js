  const Discord = require("discord.js");
const client = new Discord.Client(); 
const config = require("./config.json"); 


client.on('guildMemberAdd', member => {
  member.send(`${member}, Obrigado por entrar em nosso discord, sua presença é muito importante a nós! Seja Bem-Vindo! :heart_eyes:\n\n:book: Conheça nossas regras no chat :scroll: 💭bate-papo na mensagem fixada e fique atento para não receber nenhuma surpresa.\n\n:pushpin: Convide seus amigos para se divertir juntos!\n\n:balloon: Ajude diariamente e consiga uma TAG maneira!\n\n:white_check_mark: #Paz #Respeito`);
  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
 
  let canal = member.guild.channels.find(`name`, "📨recepção");
  if (!canal) return;  
  var embed = new Discord.RichEmbed()
  .setColor(randomColor)
  .setDescription(`🎈 **|** ${member} **Seja bem-vindo(a) ao nosso servidor Nighty » Community.**`)
  .setColor('#36393e')
  canal.send({embed : embed})
});


client.on('ready', () =>{
    let status = [
        {name: 'Ajuda?│!ajuda', type: 'STREAMING', url: 'https://twitch.tv/srmisterii'},
        {name: '😍Nighty » Community😍', type: 'LISTENING'},
        {name: '😉Steam😉', type: 'PLAYING'},
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

client.on("guildCreate", guild => {
  console.log(`O Nighty BOT entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores.`);
});

client.on("guildDelete", guild => {
  console.log(`O Nighty BOT foi removido do servidor: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores.`);
});


client.on("message", async message => {
  let responseObject = {
    "oi" : "Olá, como você está hoje?",
    "bem" : "Que bom que você está bem :slight_smile:"
  };
  
  if (responseObject[message.content]){
    message.channel.send(responseObject[message.content]);
  }

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  
  if(comando === "ping") {
    const m = await message.channel.send("Ping?");
    message.delete().catch(O_o=>{});
    m.edit(`${message.member}, Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }
});


client.login(config.token);
