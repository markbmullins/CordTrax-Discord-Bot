const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
	let serverIcon = message.guild.iconURL;
	let serverEmbed = new Discord.RichEmbed()
	.setDescription("Server information")
	.setColor("#15f153")
	.setThumbnail(serverIcon)
	.addField("Server Name", message.guild.name)
	.addField("Created On", message.guild.createdAt)
	.addField("You joined on", message.member.joinedAt)
	.addField("Total Members", message.guild.memberCount);
	return message.channel.send(serverEmbed);
}

module.exports.help = {
	name: "serverinfo"
}