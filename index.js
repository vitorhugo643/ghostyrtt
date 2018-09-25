const Discord = require("discord.js");
const client = new Discord.Client(); 
const config = require("./config.json"); 
 

client.on("guildMemberAdd", member => {
  member.guild.channels.find(c => c.name == "📥entrada").send(new Discord.RichEmbed().setDescription(`BOT - verificação\nClique no emoji abaixo para completar a verificação!`).setTimestamp()).then(msg => {
      msg.react("✅");
      let filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === member.id;
      let collector = msg.createReactionCollector(filter, { time: 30000 })
      collector.on('collect', r => {
          msg.delete()
          msg.channel.send("Parabéns, você foi verificado")
          member.addRole(member.guild.roles.find(role => role.name == "MEMBRO"))
      })
  })
});


client.on('ready', () =>{
  client.user.setGame(`Eu estou em ${client.guilds.size} servidores`);
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
    if(message.channel.id !== '480914686968070174') return message.channel.send('você não pode usar comandos aqui, vai em <#480914686968070174> e digite o comando!');
    const m = await message.channel.send("Ping?");
    message.delete().catch(O_o=>{});
    m.edit(`${message.member}, Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }
  if(comando === "apagar") {
    if(!message.member.hasPermissions("MANAGE_ROLES"))
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
    if(message.channel.id !== '480917448615395357') return message.channel.send('você não pode usar comandos aqui, vai em <#480917448615395357> e digite o comando!');
    if(!message.member.hasPermissions("MANAGE_ROLES"))
    return message.reply("Desculpe mais você não tem permissão para usar isto!");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send("@everyone\n\n"+ sayMessage);
  }
  if(comando === "urgente") { 
    if(message.channel.id !== '480917448615395357') return message.channel.send('você não pode usar comandos aqui, vai em <#480917448615395357> e digite o comando!');
    if(!message.member.hasPermissions("MANAGE_ROLES"))
    return message.reply("Desculpe mais você não tem permissão para usar isto!");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send("@here\n\n"+ sayMessage);
  }
  if(comando === "ajuda") {
    if(message.channel.id !== '480914686968070174') return message.channel.send('você não pode usar comandos aqui, vai em <#480914686968070174> e digite o comando!');
    const deleteCount = parseInt(args[0], 10);
    message.delete().catch(O_o=>{});
    message.reply("\n\nComandos do BOT:\n\nAdministradores:\n- /apagar <2 a 100> - Apagar as mensagens do chat.\n- /aviso <mensagem> - Avisar o servidor do discord.\n- /kick <mensagem> retirar uma pessoa do grupo discord.\n-/tempmute <mensagem> mutar uma pessoa por um tempo.\n-/ban <mensagem> banir uma pessoa do grupo discord.\n\nMembros:\n- /avatar - para ver sua foto de perfil.\n- /ping - Para ver seu ping/ms.\n- /criador - Para ver quem e meu Pai/Criador.\n- /online - para mostrar quantos servidores estou onlie.\n- /convite - para convidar seus amigos!");
  }
  if(comando === "criador") {
    if(message.channel.id !== '480914686968070174') return message.channel.send('você não pode usar comandos aqui, vai em <#480914686968070174> e digite o comando!');
   const deleteCount = parseInt(args[0], 10);
    message.delete().catch(O_o=>{});
    message.reply("\n\nQuem e meu Pai/Criador\n\n» NitrooPVP\n» Canal: https://www.youtube.com/NitrooPVP");
  }
  if(comando === "kick") {
    if(message.channel.id !== '480914686968070174') return message.channel.send('você não pode usar comandos aqui, vai em <#480914686968070174> e digite o comando!');
    if(!message.member.hasPermissions("MANAGE_ROLES"))
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
    message.channels.get("491312484406525953").send(`${member.user.tag} foi expulso por ${message.author.tag}\nMotivo: ${reason}`);
  }
   if(comando === "ban") {
    if(message.channel.id !== '480914686968070174') return message.channel.send('você não pode usar comandos aqui, vai em <#480914686968070174> e digite o comando!');
    if(!message.member.hasPermissions("MANAGE_ROLES"))
      return message.reply("Desculpe, você não tem permissão para usar isto!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Por favor mencione um membro válido deste servidor");
    if(!member.bannable) 
      return message.reply("Eu não posso banir este usuário! Eles pode ter um cargo mais alto ou eu não tenho permissões de banir?");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Nenhuma razão fornecida";
    await member.ban(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consegui banir o membro devido o : ${error}`));
    message.channels.get("491312484406525953").send(`${member.user.tag} foi banido por ${message.author.tag}\nMotivo: ${reason}`);
  }
     if (comando === "avatar") {
      if(message.channel.id !== '480914686968070174') return message.channel.send('você não pode usar comandos aqui, vai em <#480914686968070174> e digite o comando!');
        let usuario = message.mentions.users.first() || message.author; 
        let avatar = usuario.displayAvatarURL; 

        
        if (avatar.endsWith(".gif")) {
            avatar = `${usuario.displayAvatarURL}?size=2048`
        }

        
        message.channel.send({
            embed: {
                title: `${usuario.tag}`, 
                description: `[Link Direto](${avatar})`, 
                image: {
                    url: avatar
                }, 
                color: 6684723
                
            }
        })
    }
    if(comando === "serverinfo") {
      if(message.channel.id !== '480914686968070174') return message.channel.send('você não pode usar comandos aqui, vai em <#480914686968070174> e digite o comando!');
      const info = new Discord.RichEmbed()
          .setColor("RANDOM")
          .addField(`Informacoes do servidor`,`Membros: ${client.guilds.memberCount}\nCanais: {client.guilds.channels.size}`)
          .setFooter(`Usuario: ${message.author.tag}`,message.author.avatarURL)
          
      message.channel.send(info)
  }
if (comando === "sugestao") {
  if(message.channel.id !== '480914686968070174') return message.channel.send('você não pode usar comandos aqui, vai em <#480914686968070174> e digite o comando!');
  if (!args.slice(0).join(' ')) return message.reply('Diga sua sugestão para o GlaDOS.exe! use /sugestao (Sua sugestão)')
  var canal = message.guild.channels.find("name", "sugestões");
  if (!canal) return;
  canal.send({embed:{
      'title':'Sugestão',
      'description':args.slice(0).join(' '),
      'thumbnail':{
      }
      ,'footer':{
          'text':'Sugestão enviada por: ' + message.author.tag
      },
      'color':message.member.displayColor
  }})
  message.reply('Sua sugestão foi enviada com sucesso')}
  if(comando === "online") {
    const deleteCount = parseInt(args[0], 10);
     message.delete().catch(O_o=>{});
     message.reply(`Estou online em ${client.guilds.size} servidores!`);
   }
if(comando === "convite") {
    if(message.channel.id !== '480914686968070174') return message.channel.send('você não pode usar comandos aqui, vai em <#480914686968070174> e digite o comando!');
    message.channel.createInvite().then(invite=>{
      message.channel.send(`https://discord.gg/${invite.code}`)
      })
  }
});
  

client.login(config.token);
