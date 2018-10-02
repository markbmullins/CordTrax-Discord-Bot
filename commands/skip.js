const Discord = require("discord.js");
const YTDL = require("ytdl-core");
//to do:
module.exports.run = async (client,message,args,prefix,con_database) => {
	if(args[0] === "help"){
		return message.reply(`
Skip command help: Use ${prefix}skip to skip to the next song in the queue if playing a queue, 
or end the current song if only playing one song. You must be in the same voice channel
as the bot, and the bot must be playing music.`);
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
