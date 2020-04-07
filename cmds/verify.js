const Discord = require('discord.js');
function SendCode(to,msg,verifyid){
  const verifyembed  = new Discord.RichEmbed()
	.setColor('#00FF44')
	.setTitle('Click Here To Verify')
	.setURL(`https://driedsponge.net/verify/${verifyid}`)
	.setDescription("Open the link and login into steam to connect your discord account to your steam account. You will recive your roles within five minutes of verification.")
	.setThumbnail('https://i.driedsponge.net/images/png/2avNF.png')
	.setTimestamp()
  to.send(verifyembed)
  .catch(() => msg.reply("I could not send you your url because of your privacy settings. Please change your privacy settings to allow direct messages from server members, then try again."));
}
module.exports.run = async (client,msg,args,conn) => {
  if(msg.channel.name === 'bot-cmds'){
    let logchannel = client.channels.find(ch => ch.name === 'discord-logs');
  conn.query(`SELECT verifyid, discorduser,stamp,steamid,givenrole FROM discord WHERE discordid = ${msg.author.id}`, function (err, check) {
    if (err) throw err;
    if(check[0] && check[0].steamid !== null){
      if(check[0].verifyid === "VERIFIED"){
      if(check[0].givenrole === 1){
        let alreadyverified = new Discord.RichEmbed()
          .setTitle(`Verification Status`)
          .setColor(0x00FF44)
          .setThumbnail(msg.author.avatarURL)
          .setDescription(`You are currently verified as https://steamcommunity.com/profiles/${check[0].steamid}. If this is not your steam account please let me or a moderator know.`)
        msg.reply(alreadyverified);
      }else{       
        conn.query(`UPDATE discord SET givenrole = 1 WHERE discordid = '${msg.author.id}'`, function (err, result) {
          if (err) throw err;
          console.log("Record has been updated");
          msg.member.addRole("526657280859439116");
          let verifyembed = new Discord.RichEmbed()
          .setTitle(`Verification Status`)
          .setColor(0x00FF44)
          .setThumbnail(msg.author.avatarURL)
          .setDescription(`You have been verified as https://steamcommunity.com/profiles/${check[0].steamid} and you've been given the member role.`)
           msg.reply(verifyembed);
          
          let embed = new Discord.RichEmbed()
            .setTitle(`Verification`)
            .setColor(0x00FF44)
            .setThumbnail(msg.author.avatarURL)
            .setDescription(`${msg.author} has recieved their roles.`)
            logchannel.send(embed);
         });
        
        }
      }else if(check[0].verifyid = "UNVERIFIED"){
        let unverifyembed = new Discord.RichEmbed()
        .setTitle(`Verification Status`)
        .setColor(0xFF0000)
        .setThumbnail(msg.author.avatarURL)
        .setDescription(`I just check the database and it looks live you've been unverified. You just lost your memeber role.`)
        msg.reply(unverifyembed);
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
    let verifyid = Math.floor((Math.random() * 10000000000) + 1);
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
          SendCode(msg.author,msg,verifyid)

        });
      }else{
      conn.query(`INSERT INTO discord (discordid, verifyid, discorduser) VALUES ('${msg.author.id}','${verifyid}','${msg.author.tag.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')}')`, function (err, result) {
        if (err) throw err;
        console.log("Record has been inserted");
        SendCode(msg.author,msg,verifyid)
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