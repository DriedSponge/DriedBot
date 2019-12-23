const botSettings = require("./botsettings.json");
const prefix = botSettings.prefix;
const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');


const mysql = require('mysql');


const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.commandshelp = new Discord.Collection();
fs.readdir("./cmds/", (err, files)=> {
  if(err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0){
    console.log("no cmds to load!")
    return;
  }
  console.log(`Loading ${jsfiles.length} commands!`);
  jsfiles.forEach((f,i) => {
    let props = require(`./cmds/${f}`)
    console.log(`${i +1 }: ${f} loaded!`);
    client.commands.set(props.help.name, props);
    client.commandshelp.set(props.help.name, [props.help.description,props.help.syntax], props);
  });
});
client.on('ready', () =>{
  console.log('Bot is now connected');
  client.user.setPresence({ status: 'online', game: { name: '!help | DriedSponge.net' } });
  console.log(client.commands);
});
const conn = mysql.createConnection({
  host     : 'db.hexaneweb.com',
  port     : '3306',
  user     : 'driedspo_netuser',
  password : 'U7MQioT0uiaoUzzdKnR3sXEOIts4Jt08',
  database : 'driedspo_net',
  charset : 'utf8mb4'
});
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

client.on('message', async (msg) =>{
if(msg.author.bot) return;
if(msg.channel.type == "dm") return;
    let messageArray = msg.content.split(" ");
    let command =  messageArray[0];
    let args = messageArray.slice(1);     
    let cmd = client.commands.get(command.slice(prefix.length));
        if(cmd) cmd.run(client,msg,args,conn);
 
    if(msg.content === "!help" && msg.channel.name === 'bot-cmds'){
      
        const embed = new RichEmbed()
        .setTitle('Commands')
        .setColor(0x007BFF)
        .setDescription('**Here is the list of all of our commands:**')
        client.commandshelp.forEach((f,i) => {
            embed.addField(f[1],f[0])
          });  
        msg.reply(embed);               
      }else if(msg.content === "!help"){
        msg.delete();
        msg.reply('Please use bot commands in the bot comamnds channel').then(msg => {
        msg.delete(7000)
        });
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



client.login(botSettings.token);