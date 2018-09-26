const Discord = require('discord.js');
const bot = new Discord.Client();


bot.on("guildMemberAdd", member => {
    member.addRole(member.guild.roles.find(r => r.name == "VERIFICANDO"));
})

bot.on('guildMemberAdd', member => { 
    
    let embed = new Discord.RichEmbed()
  .addField("Clique no emoji abaixo para completar a verificação!", " OBRIGADO!")
  .setColor('#FF0000')
  .setAuthor(`COMMUNITY - Verificação`, 'https://cdn.discordapp.com/attachments/444957023130353674/462671084907528213/460264772869554176.gif')
  .setTimestamp();
  
  
  
  member.guild.channels.get('494309260163940362').send(`** ** ` + `<@` + member.user.id  + `>`);
  
  member.guild.channels.get('494309260163940362').send(embed).then(cona=> {
    cona.react('⭕')
  })
   
  
    })
  
  
  
  
  bot.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === "⭕" && user.id !== bot.user.id) {
         reaction.remove(user)
         bot.guilds.get("464207744291962925").members.get(user.id).addRole('474731010886467606')
         bot.guilds.get("464207744291962925").members.get(user.id).removeRole('494308686232158209')
         
    }
  })
bot.on('ready', () => {
    bot.user.setPresence({ game: { name: `yRecky`, type: 1, url: 'https://www.youtube.com/yRecky'} });
    console.log('Logado');
});
bot.on('message', message => {
    if (message.content.startsWith('!!twitter')){
        message.channel.send('Twitter:  https://twitter.com/RedeDarknes');
    }
});
bot.on('message', message => {
    let arraymsg = message.content.split(" ");
let cmd = arraymsg[0].toLowerCase()
let args = message.content.split(" ").slice(1);
if(cmd === '!!anuncio'){
    const args = message.content.split(" ").slice(1);
    const prefix = '/'
    message.delete()
    if (!args.slice(0).join(' ')) return message.channel.send('test')
    message.channel.send({embed:{
        'description':args.slice(0).join(' ')
        ,'color':message.member.highestRole.color,
        "thumbnail":{
            }
        }
    }
    )
}
});
bot.on('message', message => {
    let arraymsg = message.content.split(" ");
let cmd = arraymsg[0].toLowerCase()
let args = message.content.split(" ").slice(1)
    if(cmd === '!!ban'){
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
