const Discord = require("discord.js");
const commando = require("discord.js-commando");

module.exports.run = async (client, message, args, prefix, con_database) => {
	
	if (!message.guild) return;
	if(message.member.voiceChannel){
		if(!message.guild.voiceConnection){

			message.member.voiceChannel.join()
				.then(connection=>{
					message.reply("Successfully joined.");
				})
		}
		else{
			message.reply("I am already in a voice channel.")
		}
	}
	else{
		message.reply("You must be in a voice channel before I can join.");
	}
}

module.exports.help = {
	name: "join"
}
