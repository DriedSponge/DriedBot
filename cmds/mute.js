const Discord = require('discord.js');
module.exports.run = async (client,msg,args) => {
    let reason = args.join(" ").slice(22);
    if (msg.member.hasPermission(['MANAGE_MESSAGES'])) {
        let logchannel = client.channels.find(ch => ch.name === 'discord-logs');
        var user = msg.mentions.users.first();
        if (user) {
         var member = msg.guild.member(user);
          if(member){
            if(!member.roles.find(r => r.name === "Muted")){
            let kickembed = new Discord.RichEmbed()
            .setTitle(`Muted ${user.tag}`)
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
            msg.channel.send(user+" has been muted in the server!");
            member.addRole("506963223845535756");

          }else{
            
            msg.reply("This user is already muted!"); 
          }
        }else{
          msg.reply("You did not mention a user");
        }
    }else{
        msg.reply("This member does not exist");
    }
    }else{
      msg.reply("Bro don't even try");
    }
}
module.exports.help = {
    name: "mute",
    description: "Mute a user (Admins only)",
    syntax: "!mute [USER] [REASON]",
}