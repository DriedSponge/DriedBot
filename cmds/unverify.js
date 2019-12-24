const Discord = require('discord.js');
module.exports.run = async (client,msg,args,conn) => {
    let reason = args.join(" ").slice(22);
    if (msg.member.hasPermission(['MANAGE_MESSAGES'])) {
        let logchannel = client.channels.find(ch => ch.name === 'discord-logs');
        var user = msg.mentions.users.first();
        if (user) {
         var member = msg.guild.member(user);
          if(member){
            if(member.roles.find(r => r.id === "526657280859439116")){
            let kickembed = new Discord.RichEmbed()
            .setTitle(`Unverifed ${user.tag}`)
            .setColor(0xFF0000)
            .setThumbnail(user.avatarURL)
            .addField("Admin",msg.author,true)
            .addField("User",user,true)
            logchannel.send(kickembed);
            msg.channel.send(`${user} has been unverified in the server!`);
            conn.query(`DELETE FROM discord WHERE discordid=${user.id}`, function (err, result) {
              if (err) throw err;
              
            });
            member.removeRole("526657280859439116");
          }else{
            
            msg.reply("This user is not veified"); 
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
    name: "unverify",
    description: "Unverify a verified user",
    syntax: "!unverify [USER]",
}