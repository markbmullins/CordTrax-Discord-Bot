//const Queue = require("./functions/queueClass");
const queueFunctions = require("./functions/queueFunctions");
const Queue = queueFunctions.queue;
const Song = queueFunctions.song;
module.exports.run = async (client,message,args,prefix,con_database) => {
	var song = new Song("Hard in da paint", "https://www.youtube.com/watch?v=3rFpYrrhJpQ");
	var song2 = new Song("Africa","https://www.youtube.com/watch?v=FTQbiNvZqaY");
	var queue1 = new Queue("queue1");
	queue1.addSong(song);
	/*
	message.channel.send(queue1.name);
	message.channel.send(queue1.length);
	message.channel.send(queue1.titles);
	message.channel.send(queue1.URLs);
	*/
	//Converting queue object to JSON
	console.log("Queue object: ", queue1);
	var json = await JSON.stringify(queue1);
	console.log("JSON stringify: ", json);
	//Converting JSON back to queue object
	var parse = JSON.parse(json);
	console.log("JSON Parsed: ", parse);
	parse._songs = parse._songs.map(song => Object.assign(new Song, song));
	queue2 = Object.assign(new Queue, parse);
	console.log("After object assign: ", queue2);
	/*queue1.addSong(song2);
	message.channel.send(queue2.name);
	message.channel.send(queue2.length);
	message.channel.send(queue2.titles);
	message.channel.send(queue2.URLs);*/	
	return;

}//end module

module.exports.help = {
	name: "queueclass"
}