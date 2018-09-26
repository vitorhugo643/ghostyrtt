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

// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
