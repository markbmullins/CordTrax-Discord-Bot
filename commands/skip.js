const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const helpMessages = require("./functions/helpMessages.json");
//to do:
module.exports.run = async (client,message,args,prefix,con_database) => {
	const helpMessage = helpMessages.skip.replace(/\$prefix/g, `${prefix}`);
	if(args[0] === "help"){
		return message.reply(helpMessage);
	}
	if (!message.member.voiceChannel) return message.reply('You are not in a voice channel.');
	if(message.guild.voiceConnection){//Checks if bot is in voice channel
		if(message.member.voiceChannel === message.guild.me.voiceChannel){ //Checks if bot is in same  channel as messager
			if(client.queue.length > 0) client.queue.dispatcher.end();
			else{
				message.guild.voiceConnection.disconnect();
			}//end else
		}//end if
		else{
			message.reply("You must be in the same channel as me to skip.");
		}//end else
	}// end if
	else{
		message.reply("I am not playing anything.");
	}//end else
}//end module

module.exports.help = {
	name: "skip"
}
