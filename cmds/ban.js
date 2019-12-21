const Discord = require('discord.js');
module.exports.run = async (client,msg,args) => {
    let reason = args.join(" ").slice(22);
    
   
    if (msg.member.hasPermission(['BAN_MEMBERS'])) {
        let logchannel = client.channels.find(ch => ch.name === 'discord-logs');
        var user = msg.mentions.users.first();
        if (user) {
         var member = msg.guild.member(user);
          if(member){
          let kickembed = new Discord.RichEmbed()
          .setTitle(`Banned ${user.tag}`)
          .setColor(0xFF0000)
          .setThumbnail(user.avatarURL)
          .addField("Admin",msg.author,true)
          .addField("User",user,true)
          if(reason){
            kickembed.addField("Reason",reason,true)
          }else{
            kickembed.addField("Reason","Unspecified",true)
          }
          logchannel.send(kickembed);
          msg.channel.send(user+" has been banned from the server!");
          member.ban(reason);
          }else{
            msg.reply("This member does not exist");
          }
        }else{
          msg.reply("You did not mention a user");
        }
    }else{
      msg.reply("Bro don't even try");
    }
}
module.exports.help = {
    name: "ban",
    description: "Ban a user (Admins only)",
    syntax: "!ban [USER] [REASON]",
}
