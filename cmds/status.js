module.exports.run = async (client,msg,args) => {
    if(msg.channel.name === 'bot-cmds'){
        if(msg.author.id === "283710670409826304"){
       
        if(check){
         msg.reply(`The bots status has been changed to **${args}**`);  
            client.user.setPresence({ status: 'online', game: { name: `!help | ${args}`}});
        }else{
            msg.reply(`Please specify a new status`)
        }
    }else{
        msg.reply(`You do not have permission to do this`); 
    }
        

      }else{
        msg.delete();
        msg.reply('Please use bot commands in '+  client.channels.find(x => x.name === 'bot-cmds')).then(msg => {
        msg.delete(7000)
        
        });
    }
    }

module.exports.help = {
    name: "status",
    description: "Change the status of the bot (DriedSponge Only)",
    syntax: "!status [NEW STATUS]",
}