const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const token = 'NjU1ODYzMTg5NjYxMTU1MzI5.XfaU7Q.tQvV1UpH3A0KcgjBrkau176n_no';

const client = new Discord.Client();




client.on('message', (msg) =>{

    var cmds = [
        ["!advertise", "To advertise on this server, go to https://driedsponge.net/advertise.php", "This will give you the link to advertise"],
        ["!hello", "Hello"+ msg.author, "Say hello to the bot"],
        ["Who has the best bot of all time?", "<@283710670409826304> does!", "You already know the answer to this one."]
       ];

        for(k in cmds){

                if(msg.content === cmds[k][0] && msg.channel.name === 'bot-cmds'){
                    msg.channel.send(cmds[k][1]);                   
                }else if(msg.content === cmds[k][0]){
                    msg.channel.send(msg.author+' Please use bot commands in '+  client.channels.find(x => x.name === 'bot-cmds'));
                }
    }
    //Help command
    if(msg.content === "!help" && msg.channel.name === 'bot-cmds'){
      
        const embed = new RichEmbed()
        .setTitle('Commands')
        .setColor(0x007BFF)
        .setDescription('**Here is the list of all of our commands:**')
        .setFooter("This message is approved by DriedSponge");
        for(k in cmds){
          embed.addField(cmds[k][0],cmds[k][2])
        }
        msg.author.send(embed);                 
    }else if(msg.content === "!help"){
        msg.channel.send(msg.author+' Please use bot commands in '+  client.channels.find(x => x.name === 'bot-cmds'));
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
      .addField(`My Website`,`https://driedsponge.net`,true)
      .addField(`Discord Invite Link`,`https://driedsponge.net/discord`,true)
      .addField(`Advertise in my discord`,`https://driedsponge.net/advertise.php`,true)
      .setFooter("This message is approved by DriedSponge");
    member.send(embed);
  });

  client.on('guildMemberRemove', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'discord-logs');
    channel.send(`${member} left the server. We now have **${member.guild.memberCount}** members.`);
    
  });

client.on('ready', () =>{
    console.log('Bot is now connected')
    client.user.setPresence({ status: 'online', game: { name: 'DriedSponge.net' } });

});

client.login(token);