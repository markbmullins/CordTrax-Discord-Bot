const ytdl = require("ytdl-core");

module.exports.run = (client, message, args) => {
    const voiceChannel = message.member.voiceChannel;
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
    if(!voiceChannel.joinable){
        return message.reply("Somthing went wrong, I can't join your voice channel.");
    }

    const url = args[0];
    const streamOptions = { bitrate : 40000 };
    const stream = ytdl(url, { filter : 'audioonly' });
    const connection = message.guild.voiceConnection;
    let dispatcher;
    if(connection){
        dispatcher = connection.playStream(stream, streamOptions);
    } else {
        voiceChannel.join().then(connection =>  {
            dispatcher = connection.playStream(stream, streamOptions);
        });
    }

    if(dispatcher) dispatcher.on("end", () => connection.disconnect());
}



module.exports.help = {
    name: "play"
}