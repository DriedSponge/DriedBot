const Discord = require('discord.js');

module.exports.run = async (client,msg,args,conn) => {
  if(msg.channel.name === 'bot-cmds'){
    let logchannel = client.channels.find(ch => ch.name === 'discord-logs');
  conn.query(`SELECT verifyid, discorduser,stamp,steamid,givenrole FROM discord WHERE discordid = ${msg.author.id}`, function (err, check) {
    if (err) throw err;
    if(check[0] && check[0].steamid !== null){

      if(check[0].verifyid === "VERIFIED"){
      if(check[0].givenrole === "YES"){
        msg.reply(`You are already verified as https://steamcommunity.com/profiles/${check[0].steamid} If this is not your steam account please let me or a moderator know`);
      }else{       
        conn.query(`UPDATE discord SET givenrole = 'YES' WHERE discordid = '${msg.author.id}'`, function (err, result) {
          if (err) throw err;
          console.log("Record has been updated");
          msg.member.addRole("526657280859439116");
          msg.reply(`You have been verified as https://steamcommunity.com/profiles/${check[0].steamid} and you've been given the member role.`);
          let embed = new Discord.RichEmbed()
            .setTitle(`Verification`)
            .setColor(0x00FF44)
            .setThumbnail(msg.author.avatarURL)
            .setDescription(`${msg.author} has recieved their roles.`)
            logchannel.send(embed);
        });
        
        }
      }else if(check[0].verifyid = "UNVERIFIED"){
        msg.reply("I just check the database and it looks live you've been unverified. You just lost your memeber role")
        msg.member.removeRole("526657280859439116");
        let embed = new Discord.RichEmbed()
          .setTitle(`Verification`)
          .setColor(0xFF0000)
          .setThumbnail(msg.author.avatarURL)
          .setDescription(`${msg.author} has lost their roles!`)
          client.channels.find(ch => ch.id === '506832700502704148').send(embed);
      conn.query(`DELETE FROM discord WHERE discordid = '${msg.author.id}'`, function (err, result) {
       console.log("removed role from someone")
      });
      }


    }else{
    msg.reply("Check your DMs for a url to verify yourself. If you do not see a message, change your privacy settings then try again.")
    let verifyid = Math.floor((Math.random() * 100000000) + 1);
    let embed = new Discord.RichEmbed()
    .setTitle(`Verification`)
    .setColor(0xFFCC00)
    .setThumbnail(msg.author.avatarURL)
    .setDescription(`${msg.author} has started the verification process, their code is: ||${verifyid}||`)
    logchannel.send(embed);
      if(check[0] && check[0].verifyid !== null){
        conn.query(`UPDATE discord SET verifyid = '${verifyid}' WHERE discordid = '${msg.author.id}'`, function (err, result) {
          if (err) throw err;
          console.log("Record has been updated");
          msg.author.send(`Enter ||${verifyid}|| at https://driedsponge.net/verify.php to verify your self. The code will expire in five minutes. **DO NOT SHARE THIS CODE WITH ANYONE ELSE**`);
        });
      }else{
      conn.query(`INSERT INTO discord (discordid, verifyid, discorduser) VALUES ('${msg.author.id}','${verifyid}','${msg.author.tag}')`, function (err, result) {
        if (err) throw err;
        console.log("Record has been inserted");
        msg.author.send(`Enter ||${verifyid}|| at https://driedsponge.net/verify.php to verify your self. The code will expire in five minutes. **DO NOT SHARE THIS CODE WITH ANYONE ELSE**`);
      });
    }
  }
});
}else{
     msg.delete();
    msg.reply('Please use bot commands in the bot comamnds channel').then(msg => {
    msg.delete(7000)
    });
}

}
  
module.exports.help = {
    name: "verify",
    description: "Verify your steam account with us",
    syntax: "!verify",
}