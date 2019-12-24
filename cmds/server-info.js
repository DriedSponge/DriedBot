const Discord = require('discord.js');
module.exports.run = async (client,msg,args) => {
    if(msg.channel.name === 'bot-cmds'){
        if(msg.guild.available){
        let infoembed = new Discord.RichEmbed()
        .setTitle(`About ${msg.guild.name}`)
        .setColor(0x007BFF)
        .setThumbnail(msg.guild.iconURL,true)
        .addField("Server Name:",msg.guild.name,true)
        .addField("Server ID:",msg.guild.id,true)
        .addField("Members:",msg.guild.memberCount,true)
        .addField("Region:",msg.guild.region,true)
        .addField("Server Owner:",msg.guild.owner.user.tag,true)
        //.addField("User",user)
        msg.channel.send(infoembed);
    }else{
        msg.reply(`Data on this server seems to be unavliable`)
    }
      }else{
          msg.delete();
          msg.reply('Please use bot commands in '+  client.channels.find(x => x.name === 'bot-cmds')).then(msg => {
          msg.delete(7000)
          });
      }
    }

module.exports.help = {
    name: "server-info",
    description: "Returns info on the sever",
    syntax: "!server-info",
}
