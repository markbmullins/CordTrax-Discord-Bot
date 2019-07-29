const Discord = require('discord.js');
const helpMessages = require('../helpMessages.json');

//To do: include clipart into
// https://openclipart.org/detail/297747/record-player
//
module.exports.run = async (client,message,args,prefix,con_database) => {
	const helpMessage = helpMessages.botinfo.replace(/\$prefix/g, `${prefix}`);
	//if help 
	if(args[0] === "help") return message.reply(`${helpMessage}`);
	let botIcon = client.user.displayAvatarURL;
	let botembed = new Discord.RichEmbed()
	.setDescription("Bot information")
	.setColor("#15f153")
	.setThumbnail(botIcon)
	.addField("Bot Name", client.user.username)
	.addField("Created On", client.user.createdAt)
	.addField("Author", "Mark Mullins");
	return message.channel.send(botembed);
}

module.exports.help = {
	name: "botinfo"
}
