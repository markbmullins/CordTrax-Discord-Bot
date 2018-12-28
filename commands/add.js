const Discord = require("discord.js");

//Functions
const getQueue = require('../functions/getQueue.js');
const inputParse = require('../functions/inputParse.js');
const insertNewInDatabase = require('../functions/insertNewInDatabase.js');
const updateDatabase = require('../functions/updateDatabase.js');

//Classes
const Queue = require('../classes/Song.js');
const Song = require('../classes/Queue.js');

//Help messages
const helpMessages = require('../helpMessages.json');

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
	var	input = await inputParse(message,args,prefix,helpMessage); //input[0] = queue name input[1] = URL, 
																		 //input[2] = title input[3]= message;
	if(input[3]){return message.reply(input[3]);}
	//See if queue exists:
	var queue = await getQueue(input[0],message,con_database);
	var song = new Song(input[2], input[1]);
	//if queue does not exist
	console.log("Return from getQueue: ", queue);
	if(!queue){
		queue = new Queue(input[0]);
		queue.addSong(song);
		let var1 = await insertNewInDatabase(queue, message, con_database);
	}
	else{
		queue.addSong(song);
		let var1 = await queueFunctions.updateDatabase(queue, message, con_database);
	}
	console.log("past updating database");
	 //args[0] == queue name, args[1] == url
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
