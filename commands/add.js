const Discord = require("discord.js");
const queueFunctions = require("./functions/queueFunctions");
const tools = require("./functions/tools");
const helpMessages = require("./functions/helpMessages.json");
const Queue = queueFunctions.queue;
const Song = queueFunctions.song;
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
	var	input = await tools.inputParse(message,args,prefix,helpMessage); //input[0] = queue name input[1] = URL, input[2] = title (false if not entered)
	//See if queue exists:
	var queue = await queueFunctions.getQueue(input[0],message,con_database);
	//if queue does not exist
	console.log(queue);
	if(!queue){
		queue = new Queue(input[0]);
	}
	var song = new Song(input[2], input[1]);
	queue.addSong(song);
	let var1 = await queueFunctions.updateDatabase(queue, message, con_database); //args[0] == queue name, args[1] == url
	//Get metadata of song then create a richembed for the song.
	/*queueFunctions.getMetadata(input[1]).then(
		result => {
			queue.addTitle(`${result.title}`);
			tools.createRichEmbed(result.title, result.length_seconds, result.thumbnail_url, message, input[0], con_database);
		},
		error => {
 			if (error) throw error
		}//end error
	);//end getMetadata(url)*/
	return;
}
//End module.exports.run()

module.exports.help = {
	name: "add"
}

//mysql> describe queues;
