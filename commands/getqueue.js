const Discord = require("discord.js");
const YTDL = require("ytdl-core");

async function getQueue(queueName, message, con_database){
	return new Promise(
		(resolve, reject) => {
			con_database.query(`SELECT * FROM queues WHERE userid = '${message.author.id}' and queuename = '${queueName}'`, 
				(err, result) =>{
					if(err) reject(err);
					else{
						if(result.length===0){
							let queueArray = [];
							resolve(queueArray);
						}//end if
						else{
							let currentQueue = result[0].queue;
							//console.log(result[0].queue);
							let queueArray = currentQueue.split(";");
							queueArray.pop(); //Last semicolon results in empty element of array at the end
							resolve(queueArray);
						}//end else
					}//end else
				}//end (err,result) =>
			);//end con_datbase.query
		}//end function
	);//end promise
}//end getQueue();
 
function getMetadata(url) {
	return new Promise((resolve, reject) => {
    	YTDL.getBasicInfo(url, 
    		(error, info) => {
      			if (error) reject(error);
      			resolve(info);
    		});
  	});
}

async function getTitles(queue){
	var titles=[];
	var count = 0;
	return new Promise(async (resolve, reject) => {
		for(count = 0; count < queue.length; count++){
			var result = await getMetadata(queue[count]);
			titles[count] = result.title;
		}
		resolve(titles);
		reject("Bad parameter");
	});//end promise
}//end getTitiles

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
		var queue = await getQueue(args[0], message, con_database);
	}//end else 

	if(queue.length < 1){
		message.reply(`This queue is empty or does not exist. Use the add command to add songs to a queue. For help adding songs to your queue, type ${prefix}add help.`);
	}
	else if(queue.length >= 1){
		//Counting up the number of embeds needed if using the .addfield method.
		var numEmbeds = Math.floor(queue.length / 25)
		if (queue.length % 25 != 0) numEmbeds += 1;

		var titles = await getTitles(queue);
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