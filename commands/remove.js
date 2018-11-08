const Discord = require("discord.js");
const queueFunctions = require("./functions/queueFunctions");
const helpMessages = require("./functions/helpMessages.json");

//remove queueName
//Please select the songs to remove from queueName
//1. afafafa
//2. adfsadf
//3. SFAFDSAFASDF
//2,3 or 2, 3 or 2 3 or none or all

module.exports.run = async (client,message,args,prefix,con_database) => {
	const helpMessage = helpMessages.remove.replace(/\$prefix/g, `${prefix}`);
	//!inqueue
	if(!args[0]){
			message.reply("Please provide a queue to remove songs from. ");
			return message.reply(helpMessage);
	}//end if
	//!inqueue help
	else if(args[0] === "help"){
		return message.reply(helpMessage);
	}//end else if
	else {
		var queue = await queueFunctions.getQueue(args[0], message, con_database);
	}//end else 
	//!inqueue <args[0]>
	if(queue.length > 0){
		var titles = await queueFunctions.getTitles(queue);
		var titlesString = await queueFunctions.createTitlesString(titles);
		var response;
		var regex = /((\d)(,)?)+/gm;
		var var1 = await message.channel.send(`Please select the songs from ${args[0]} you would like to delete: \n (Separate numbers with a comma and a space like so: 1, 2, 3, 4)\n${titlesString}`);//end message.send
		try{
			//.awaitMessages(filter, [options]) Resolves with a collection of messages that pass the specified filter.
			response = await message.channel.awaitMessages(msg => regex.test(msg) && !message.author.bot, {
							maxMatches: 1,
							time: 5000,
							errors: ['time']
						});
		}//end try
		catch(err){
			//console.error(err);
			return message.channel.send("Invalid value entered, cancelling operation");
		}//end catch
		var choiceArray;
		if(response.first().content.length > 3) choiceArray = response.first().content.split(", ");
		for(var i=0; i<choiceArray.length; i++) { choiceArray[i] = +choiceArray[i]; } 
			
		return;
		
	}//end if
	else{
		return message.reply("This queue does not exist or is empty.");
	}
}//End module.exports.run()

module.exports.help = {
	name: "remove"
}