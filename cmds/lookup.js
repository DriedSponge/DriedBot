
module.exports.run = async (client,msg,args) => {
    if(msg.channel.name === 'bot-cmds'){
        check = args.join("");
        if(check){
         msg.reply(`https://driedsponge.net/lookup/${check}`);  
        }else{
            msg.reply(`Please specify any form of SteamID or vanity URL`)
        }   
      }else{
        msg.delete();
        msg.reply('Please use bot commands in '+  client.channels.find(x => x.name === 'bot-cmds')).then(msg => {
        msg.delete(7000)
        
        });
    }
    }

module.exports.help = {
    name: "lookup",
    description: "Look up any info on a steam user.",
    syntax: "!lookup [STEAMID, CUSTOM URL]",
}