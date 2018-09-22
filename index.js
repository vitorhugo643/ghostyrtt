const Discord = require("discord.js"); //baixar a lib
const client = new Discord.Client(); 
const config = require("./config.json"); 


client.on("ready", () => {
    let status = [
        {name: 'Ajuda?│/ajuda', type: '1', url: 'https://twitch.tv/srmisterii'},
        {name: '😍Nighty » Community😍', type: '3'},
        {name: '😉Steam😉', type: '0'},
        {name: 'Sr.Misterii│YouTube', type: '2'},
      ];
      
      // 1 = Transmitindo
      // 2 = Ouvindo
      // 0 = Jogando
      // 3 = Assistindo
      
        function setStatus() {
            let randomStatus = status[Math.floor(Math.random() * status.length)];
            client.user.setPresence({game: randomStatus});
        }
      
        setStatus();
        setInterval(() => setStatus(), 10000);  //10000 = 10Ms = 1
  });

client.on("guildCreate", guild => {
  console.log(`O bot entrou nos servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

client.on("guildDelete", guild => {
  console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
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
  if(comando === "apagar") {
    if(!message.member.roles.some(r=>["🌟DONO", "👾DIRETORIA [BOT]"].includes(r.name)) )
    return message.reply("Desculpe mais você não tem permissão para usar isto!");
    const deleteCount = parseInt(args[0], 10);
    message.delete().catch(O_o=>{});
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Coloque ou forneça um número entre 2 e 100 para remover as mensagens!");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
  }
  if(comando === "aviso") { 
    if(!message.member.roles.some(r=>["🌟DONO", "👾DIRETORIA [BOT]"].includes(r.name)) )
    return message.reply("Desculpe mais você não tem permissão para usar isto!");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send("@everyone\n\n"+ sayMessage);
  }
  if(comando === "urgente") { 
    if(!message.member.roles.some(r=>["🌟DONO", "👾DIRETORIA [BOT]"].includes(r.name)) )
    return message.reply("Desculpe mais você não tem permissão para usar isto!");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send("@here\n\n"+ sayMessage);
  }
  if(comando === "ajuda") {
    const deleteCount = parseInt(args[0], 10);
    message.delete().catch(O_o=>{});
    message.reply("\n\nComandos do BOT:\n\nAdministradores:\n- /apagar <2 a 100> - Apagar as mensagens do chat.\n- /aviso <mensagem> - Avisar o servidor do discord.\n\nMembros:\n- /ping - Para ver seu ping/ms.\n- /criador - Para ver quem e meu Pai/Criador.");
  }
  if(comando === "criador") {
    const deleteCount = parseInt(args[0], 10);
    message.delete().catch(O_o=>{});
    message.reply("\n\nQuem e meu Pai/Criador\n\n» NitrooPVP\n» Canal: https://www.youtube.com/NitrooPVP");
  }
  if(comando === "kick") {
    if(!message.member.roles.some(r=>["🌟DONO", "++"].includes(r.name)) )
      return message.reply("Desculpe, você não tem permissão para usar isto!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Por favor mencione um membro válido deste servidor");
    if(!member.kickable) 
      return message.reply("Eu não posso expulsar este usuário! Eles pode ter um cargo mais alto ou eu não tenho permissões de expulsar?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Nenhuma razão fornecida";
    
    await member.kick(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consegui expulsar o membro devido o: ${error}`));
    message.reply(`${member.user.tag} foi kickado por ${message.author.tag} Motivo: ${reason}`);
  }
});


client.login(config.token);
