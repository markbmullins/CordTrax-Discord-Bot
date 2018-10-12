const Discord = require("discord.js");
const queueFunctions = require("./functions/queueFunctions");
const helpMessages = require("./functions/helpMessages.json");

//TO DO:
//Add help message.
//inqueue getqueue and printqueue are all equivalent
//Fisher-Yates (aka Knuth) Shuffle
async function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

module.exports.run = async (client,message,args,prefix,con_database) => {
	const helpMessage = helpMessages.shuffle.replace(/\$prefix/g, `${prefix}`);
	if(args[0] === "help"){
		return message.reply(helpMessage);
	}
	else if(!args[0]){
		return message.reply(`Please input a queue name to shuffle. Use ${prefix}shuffle help for help using the shuffle command.`);
	}
	else if(args[1]){
		return message.reply(`Invalid use of the shuffle command. Use ${prefix}shuffle help for help.`);
	}
	else{
		var queue = await queueFunctions.getQueue(args[0], message, con_database);
		if(queue.length < 1){
			message.reply(`This queue is empty or does not exist. Use the add command to add songs to a queue. For help adding songs to your queue, type ${prefix}add help.`);
		}//end if
		else if(queue.length >= 1){
			queue = await shuffle(queue);
			let var1 = await queueFunctions.updateQueue(queue, args[0], message, con_database);
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
			queueEmbed.setTitle(`${args[0]} was shuffled. It now looks like: `);
			queueEmbed.setColor("#15f153");
			queueEmbed.setDescription(titlesString);
			return message.channel.send(queueEmbed);

		}//end else if
	}//end else
}//end module

module.exports.help = {
	name: "shuffle"
}