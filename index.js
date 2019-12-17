const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const token = 'NjU1ODYzMTg5NjYxMTU1MzI5.XfaU7Q.tQvV1UpH3A0KcgjBrkau176n_no';

const client = new Discord.Client();


client.on('ready', () =>{
  console.log('Bot is now connected')
  client.user.setPresence({ status: 'online', game: { name: '!help | DriedSponge.net' } });

});

client.on('message', (msg) =>{

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
      //Kick
      if (msg.content.startsWith('!kick') && msg.member.hasPermission(['KICK_MEMBERS'])) {
        const user = msg.mentions.users.first();
          if (user) {
            const member = msg.guild.member(user);
            if(member){
            let kickembed = new RichEmbed()
            .setTitle('Kicked '+ user.tag)
            .setColor(0xFF0000)
            .setThumbnail(user.avatarURL)
            .addField("Admin",msg.author,true)
            .addField("User",user,true)
            .addField("Reason",reason,true)
            logchannel.send(kickembed);
            msg.channel.send(user+" has been kicked from the server!");
            member.kick(reason);
            }else{
              msg.reply("This member does not exist");
            }
          }else{
            msg.reply("You did not mention a user");
          }
      }else if(msg.content.startsWith('!kick')){
        msg.reply("Bro don't even try");
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

});





// Remeber member represents the server
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'hello');
    channel.send(`**Welcome to the server,** ${member}. We now have **${member.guild.memberCount}** members!`);
    const embed = new RichEmbed()
      .setTitle('Welcome to my man cave!')
      .setColor(0x007BFF)
      .setDescription('Welcome to my man cave! Please be sure to review the rules, thank you! Here are some useful links:')
      .addField(`My Website`,`https://driedsponge.net`)
      .addField(`Discord Invite Link`,`https://driedsponge.net/discord`)
      .addField(`Advertise in my discord`,`https://driedsponge.net/advertise.php`)
      .setFooter("This message is approved by DriedSponge");
    member.send(embed);
  });

  client.on('guildMemberRemove', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'discord-logs');
    channel.send(`${member} left the server. We now have **${member.guild.memberCount}** members.`);
    
  });



client.login(token);