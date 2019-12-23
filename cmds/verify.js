const Discord = require('discord.js');

module.exports.run = async (client,msg,args,conn) => {
  if(msg.channel.name === 'bot-cmds'){
  conn.query(`SELECT verifyid, discorduser,stamp,steamid,givenrole FROM discord WHERE discordid = ${msg.author.id}`, function (err, check) {
    if (err) throw err;
    if(check[0] && check[0].steamid !== null){
      if(check[0].givenrole === "YES"){
        msg.reply(`You are already verified as https://steamcommunity.com/profiles/${check[0].steamid} If this is not your steam account please let me or a moderator know`);
      }else{       
        conn.query(`UPDATE discord SET givenrole = 'YES' WHERE discordid = '${msg.author.id}'`, function (err, result) {
          if (err) throw err;
          console.log("Record has been updated");
          msg.member.addRole("526657280859439116");
          msg.reply(`You have been verified as https://steamcommunity.com/profiles/${check[0].steamid} and you've been given the member role.`);
        });
      }

    }else{
    msg.reply("Check your DMs for a url to verify yourself. If you do not see a message, change your privacy settings then try again.")
    let verifyid = Math.floor((Math.random() * 100000000) + 1);
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