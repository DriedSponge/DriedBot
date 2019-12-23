const Discord = require('discord.js');

module.exports.run = async (client,msg,args,conn) => {
  msg.reply("Check your DMs for a url to verify yourself. If you do not see a message, change your privacy settings then try again.")
  let verifyid = Math.floor((Math.random() * 1000000) + 1);
  conn.query(`INSERT INTO discord (discordid, verifyid) VALUES ('${msg.author.id}','${verifyid}')`, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  msg.author.send(`Enter ||${verifyid}|| at https://driedsponge.net/verify.php to verify your self. **DO NOT SHARE THIS CODE WITH ANYONE ELSE**`);
}
module.exports.help = {
    name: "verify",
    description: "Verify your steam account with us",
    syntax: "!verify",
}