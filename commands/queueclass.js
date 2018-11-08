const Queue = require("./functions/queueClass");

module.exports.run = async (client,message,args,prefix,con_database) => {
	var queue1 = new Queue("queue1");
	queue1.addTitle("Hard in da paint");
	queue1.addTitles(["Africa", "TTG"]);
	message.channel.send(queue1.name);
	message.channel.send(queue1.length);
	//Converting queue object to JSON
	console.log("Queue1 object: ", queue1);
	var json = await JSON.stringify(queue1);
	console.log("JSON: ", json);
	//Converting JSON back to queue object
	var parse = await JSON.parse(json);
	console.log("Parsed: ", parse);
	queue2 = Object.assign(new Queue, parse);
	
	queue2.addTitle("slim shady");
	console.log("queue2: ", queue2.titles);
	return message.channel.send(queue1.titles);

}//end module

module.exports.help = {
	name: "queueclass"
}