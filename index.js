const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const token = 'NjU1ODYzMTg5NjYxMTU1MzI5.XfaU7Q.tQvV1UpH3A0KcgjBrkau176n_no';

const client = new Discord.Client();


client.on('ready', () =>{
  console.log('Bot is now connected')
  client.user.setPresence({ status: 'online', game: { name: '!help | DriedSponge.net' } });

});

// var mysql = require('mysql');

/* var conn = mysql.createConnection({
  host: "db.hexaneweb.com",
  user: "driedspo_netuser",
  password: "U7MQioT0uiaoUzzdKnR3sXEOIts4Jt08"
});

conn.connect(function(err) {
  console.log("Connected!");
}); */

client.on('message', (msg) =>{
if(msg.author.bot === false){
    var cmds = [
        ["!advertise", "To advertise on this server, go to https://driedsponge.net/advertise.php"],
        ["!hello", "Hello"+ msg.author],
        ["Who has the best bot of all time?", "<@283710670409826304> does!"]
       ];
       var cmdshelp = [
        ["!advertise", "This will give you the link to advertise"],
        ["!hello", "Say hello to the bot"],
        ["Who has the best bot of all time?","You already know the answer to this one."],
        ["!lookup [SteamID, ID64, URL, Custom URL]","Lookup the information on someone's steam profile."]
       ];
        for(k in cmds){

                if(msg.content === cmds[k][0] && msg.channel.name === 'bot-cmds'){
                  msg.channel.send(cmds[k][1]);
                }else if(msg.content === cmds[k][0]){
                    msg.delete();
                    msg.reply('Please use bot commands in '+  client.channels.find(x => x.name === 'bot-cmds')).then(msg => {
                    msg.delete(7000)
                    });
                }
    }
    //Admin commands

      let messageArray = msg.content.split(" ");
      let args = messageArray.slice(1);
      let reason = args.join(" ").slice(22);
      let logchannel = client.channels.find(ch => ch.name === 'discord-logs');
      var user = msg.mentions.users.first();
      var member = msg.guild.member(user);
      var admcmds = [
        ["!ban",  "Banned ", "BAN_MEMBERS",  function() {member.ban(reason)}, "banned"],
        ["!kick",  "Kicked ", "KICK_MEMBERS",  function() {member.kick(reason)}, "kicked"]
       ];
       for(k in admcmds){
        if (msg.content.startsWith(admcmds[k][0]) && msg.member.hasPermission([admcmds[k][2]])) {
            if (user) {
              if(member){
              let kickembed = new RichEmbed()
              .setTitle(admcmds[k][1] + user.tag)
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
              msg.channel.send(user+" has been "+admcmds[k][4] +" from the server!");
              admcmds[k][3]();
              }else{
                msg.reply("This member does not exist");
              }
            }else{
              msg.reply("You did not mention a user");
            }
        }else if(msg.content.startsWith(admcmds[k][0])){
          msg.reply("Bro don't even try");
        }
    }

    //Help command
    if(msg.content === "!help" && msg.channel.name === 'bot-cmds'){
      
        const embed = new RichEmbed()
        .setTitle('Commands')
        .setColor(0x007BFF)
        .setDescription('**Here is the list of all of our commands:**')
        for(k in cmdshelp){
          embed.addField(cmdshelp[k][0],cmdshelp[k][1])
        }
        
        msg.reply(embed);               
      }else if(msg.content === "!help"){
        msg.delete();
        msg.reply('Please use bot commands in '+  client.channels.find(x => x.name === 'bot-cmds')).then(msg => {
        msg.delete(7000)
        });
    }

    //Advanced commands
    if(msg.content.startsWith('!lookup') && msg.channel.name === 'bot-cmds'){
      let messageArray = msg.content.split(" ");
      let args = messageArray.slice(1);
      msg.reply("https://driedsponge.net/controller.php?id="+args);  
             
    }else if(msg.content === "!lookup"){
      msg.delete();
      msg.reply('Please use bot commands in '+  client.channels.find(x => x.name === 'bot-cmds')).then(msg => {
      msg.delete(7000)
      
      });
  }
}
});





// Remeber member represents the server
client.on('guildMemberAdd', newmember => {
    // Send the message to a designated channel on a server:
    const channel = newmember.guild.channels.find(ch => ch.name === 'hello');
    channel.send(`**Welcome to the server,** ${newmember}. We now have **${newmember.guild.memberCount}** members!`);
    const embed = new RichEmbed()
      .setTitle('Welcome to my man cave!')
      .setColor(0x007BFF)
      .setDescription('Welcome to my man cave! Please be sure to review the rules, thank you! Here are some useful links:')
      .addField(`My Website`,`https://driedsponge.net`)
      .addField(`Discord Invite Link`,`https://driedsponge.net/discord`)
      .addField(`Advertise in my discord`,`https://driedsponge.net/advertise.php`)
      .setFooter("This message is approved by DriedSponge");
      newmember.send(embed);
  });

  client.on('guildMemberRemove', oldmember => {
    // Send the message to a designated channel on a server:
    const channel = oldmember.guild.channels.find(ch => ch.name === 'discord-logs');
    channel.send(`${oldmember} left the server. We now have **${oldmember.guild.memberCount}** members.`);
    
  });



client.login(token);