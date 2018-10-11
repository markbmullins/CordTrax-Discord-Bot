const Discord = require("discord.js");
const commando = require("discord.js-commando");
const helpMessages = require("./functions/helpMessages.json");

module.exports.run = async (client,message,args,prefix,con_database) => {
	const helpMessage = helpMessages.join.replace(/\$prefix/g, `${prefix}`);
	//if help 
	if(args[0] === "help") return message.reply(`${helpMessage}`);
	
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
