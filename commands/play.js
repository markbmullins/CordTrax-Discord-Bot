const YTDL = require("ytdl-core");

module.exports.run = async (client, message, args) => {
    const regex = /^(https:\/\/)?(www.)?youtube.com\//;
    const voiceChannel = message.member.voiceChannel;
    let url = args[0];

    //Checking permissions
    if(!voiceChannel){
        return message.reply("You must be in a voice channel.")
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT')){
        return message.reply("I cannot connect to your voice channel, make sure I have the proper permissions.");
    }
    if(!permissions.has('SPEAK')){
        return message.reply("I cannot speak in this voice channel, make sure I have the proper permissions.");
    }

    if(!message.guild.voiceConnection){

    client.queueIndex = 0;
    message.member.voiceChannel.join().then(connection =>  {
        const streamOptions = {bitrate : 40000};
        const stream = ytdl(url, { filter : 'audioonly' });
        const dispatcher = connection.playStream(stream, streamOptions);
        dispatcher.on("end", () => connection.disconnect());
    });

    }//end if
}//end module



module.exports.help = {
    name: "play"
}