const Discord = require("discord.js");
const helpMessages = require("./functions/helpMessages.json");
const getXp = require('./getXp.js');

//To do:
//Add message.channel.send into a RichEmbed
module.exports.run = async (client, message, args, prefix, con_database) => {
	const helpMessage = helpMessages.xp.replace(/\$prefix/g, `${prefix}`);
	//if help 
	if(args[0] === "help") return message.reply(`${helpMessage}`);
	
	//           get first person mentioned     or search guild for ID                or person who sent message
	let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
	var userId = target.id;
	
	//Getting xp from database:
	var xp = getXp(userId);
	return message.channel.send(xp);
}

module.exports.help = {
	name: "xp"
}
