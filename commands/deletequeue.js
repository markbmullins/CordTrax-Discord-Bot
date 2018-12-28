const Discord = require("discord.js");

//Functions
const getQueue = require('../functions/getQueue.js');
const deleteQueue = require('deleteQueue.js'):

//Help Messages
const helpMessages = require('../helpMessages.json');

module.exports.run = async (client,message,args,prefix,con_database) => {
	const helpMessage = helpMessages.deletequeue.replace(/\$prefix/g, `${prefix}`);
	if(args[0] === "help"){
		return message.reply(helpMessage);
	}
	else if(!args[0]){
		return message.reply(`Please input a queue name to delete. Use ${prefix}delete help for help using the deletequeue command.`);
	}
	else if(args[1]){
		return message.reply(`Invalid use of the deletequeue command. Use ${prefix}deletequeue help for help.`);
	}
	else{
		var queue = await getQueue(args[0], message, con_database);
		if(queue.length < 1){
			message.reply("This queue is empty or does not exist.");
		}//end if
		else if(queue.length >= 1){
			try{
				message.channel.send(`Are you sure you want to delete ${args[0]}? Please reply yes or no.`);//end message.send
				try{
					var response = await message.channel.awaitMessages(message2 => (message2.content.toLowerCase() === "yes" || message2.content.toLowerCase() === "no"), {
									maxMatches: 1,
									time: 5000,
									errors: ['time']
								});
				}//end try
				catch(err){
					//console.error(err);
					return message.channel.send("Invalid value entered, cancelling operation");
				}//end catch
				if(response.first().content == "yes"){
					let var2 = await deleteQueue(args[0], message, con_database);
					return message.reply(`${args[0]} was deleted.`);
				}
				else if(response.first().content == "no"){
					return message.reply("Alright, I won't delete that queue");
				}

			}//end try
			catch(err){
				console.error(err);
				return message.channel.send("An error occured.");
			}//end catch
		}//end else if
	}//end else
}//end module

module.exports.help = {
	name: "deletequeue"
}
