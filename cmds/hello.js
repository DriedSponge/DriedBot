module.exports.run = async (client,msg,args) => {
    if(msg.channel.name === 'bot-cmds'){
        msg.reply("wassup");
      }else{
          msg.delete();
          msg.reply('Please use bot commands in '+  client.channels.find(x => x.name === 'bot-cmds')).then(msg => {
          msg.delete(7000)
          });
      }
    }

module.exports.help = {
    name: "hello",
}