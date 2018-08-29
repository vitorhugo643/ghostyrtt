const Discord = require('discord.js');
const bot = new Discord.Client();


bot.on('ready', () => {
     bot.user.setPresence({ game: { name: `Olá eu sou a Marta's Discord!`, type: 1, url: 'https://www.youtube.com/yRecky'} });
    console.log('Logado');
});
bot.on('message', message => {
  let arraymsg = message.content.split(" ");
let cmd = arraymsg[0].toLowerCase()
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
bot.on('guildMemberAdd', member => {
  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
 
  let canal = member.guild.channels.find(`name`, "entrada🙋");
  if (!canal) return;

  var embed = new Discord.RichEmbed()
  .setColor(randomColor)
  .setDescription(`🎈 **Olá ${member}, seja bem-vindo ao Discord oficial Marta's Discord!**

  » **Twitter:** https://twitter.com/Martinhaa161)
  canal.send({embed : embed})
});

// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
