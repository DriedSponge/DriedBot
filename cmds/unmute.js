const Discord = require('discord.js');
module.exports.run = async (client,msg,args) => {
    let reason = args.join(" ").slice(22);
    if (msg.member.hasPermission(['MANAGE_MESSAGES'])) {
        let logchannel = client.channels.find(ch => ch.name === 'discord-logs');
        var user = msg.mentions.users.first();
        if (user) {
         var member = msg.guild.member(user);
          if(member){
            if(member.roles.find(r => r.name === "Muted")){
            let kickembed = new Discord.RichEmbed()
            .setTitle(`Unmuted ${user.tag}`)
            .setColor(0x00FF44)
            .setThumbnail(user.avatarURL)
            .addField("Admin",msg.author,true)
            .addField("User",user,true)
            logchannel.send(kickembed);
            msg.channel.send(`${user} has been unmuted in the server!`);
            member.removeRole("506963223845535756");

          }else{
            
            msg.reply("This user is not muted"); 
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
    name: "unmute",
    description: "Unmute a muted user (Admins only)",
    syntax: "!unmute [USER]",
}