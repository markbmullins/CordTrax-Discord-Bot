const stop = connection => {
    if(connection) connection.disconnect();
}


module.exports.run = (client, message, args) => {
    stop(message.guild.voiceConnection)
}



module.exports.help = {
    name: "stop"
}