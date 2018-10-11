const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const queueFunctions = require("./functions/queueFunctions")

module.exports.run = async (client,message,args,prefix,con_database) => {
	var helpMessage = (`

		`);
	//!inqueue
	if(!args[0]){
			message.reply("Please provide a queue to look up.");
			return message.reply(helpMessage);
	}//end if
	//!inqueue help
	else if(args[0] === "help"){
		return message.reply(helpMessage);
	}//end else if
	//!inqueue <args[0]>
	else {
		var queue = await queueFunctions.getQueue(args[0], message, con_database);
	}//end else 

	if(queue.length < 1){
		message.reply(`This queue is empty or does not exist. Use the add command to add songs to a queue. For help adding songs to your queue, type ${prefix}add help.`);
	}
	else if(queue.length >= 1){
		//Counting up the number of embeds needed if using the .addfield method.
		var numEmbeds = Math.floor(queue.length / 25)
		if (queue.length % 25 != 0) numEmbeds += 1;

		var titles = await queueFunctions.getTitles(queue);
		var count;
		for(count = 0; count < titles.length; count++){
			titles[count] = `${count+1}. ${titles[count]}` ;
		}
		var titlesString = "";
		for(count = 0; count < titles.length; count++){
			titlesString = titlesString + titles[count] + "\n";	
		}

		let queueEmbed = new Discord.RichEmbed();
		queueEmbed.setTitle(`In queue ${args[0]}:`);
		queueEmbed.setColor("#15f153");
		queueEmbed.setDescription(titlesString);
		return message.channel.send(queueEmbed);
	}
}//End module.exports.run()

module.exports.help = {
	name: "getqueue"
}