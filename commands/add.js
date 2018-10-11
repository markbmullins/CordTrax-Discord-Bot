const Discord = require("discord.js");
const queueFunctions = require("./functions/queueFunctions");
const tools = require("./functions/tools");
const helpMessages = require("./functions/helpMessages.json");

//to do:
//Add contents of queue to richEmbed
module.exports.run = async (client,message,args,prefix,con_database) => {
	//!add                     |Help message
	//!add help                |Help message
	//!add <url>               |adds to default queue
	//!add <Queue2> <url>      |adds to queue2
	//!add <"song">            |searches youtube, adds song to default queue
	//!add <queue2> <"song">   |searches youtube, adds song to queue2
	const helpMessage = helpMessages.add.replace(/\$prefix/g, `${prefix}`);
	var	input = await tools.inputParse(message,args,prefix,helpMessage);
	var queueName = input[0];
	var URL = input[1];
	if(typeof(URL) === 'string'){
		let var1 = await queueFunctions.addToQueue(queueName, URL, message, con_database); //args[0] == queue name, args[1] == url
		//Get metadata of song then create a richembed for the song.
		queueFunctions.getMetadata(URL).then(
			result => {
				tools.createRichEmbed(result.title, result.length_seconds, result.thumbnail_url, message, queueName, con_database);
			},
			error => {
	 			if (error) throw error
			}//end error
		);//end getMetadata(url)
	}
}
//End module.exports.run()

module.exports.help = {
	name: "add"
}

//mysql> describe queues;
