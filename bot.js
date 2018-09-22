const Discord = require('discord.js');
const bot = new Discord.Client();

 
bot.on('ready', () => {
    let counter = 0
    setInterval(function() {
        counter+= 1
        counter %= activities.length
    }, 10000)

    const activities2 = ['LISTENING', 'WATCHING', 'PLAYING', 'WATCHING']
    let counter2 = 0
    setInterval(function() {
        bot.user.setActivity(activities[counter], { type: activities2[counter2] })
        counter2+= 1
        counter2 %= activities2.length
    }, 10000)
    console.log('Logado');
});
bot.on('message', message => {
    if (message.content.startsWith('/ajuda')){
        message.channel.send('Estou em desenvolvimento, então quando adicionar comandos, meu criador avisara.\nCriador: NitrooPVP#4025.');
    }
    if (message.content.startsWith('/comandos')){

        message.channel.send('Comandos enviado no seu privado.');

message.author.send('Olá, aqui está os comandos\n \n/ajuda\n \n/comandos\n \n/criador\n \nAinda vamos adicionar mais comandos!')
}
    if (message.content.startsWith('/criador')){
        message.channel.send('Meu criador: NitrooPVP#4025.');
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
