const Discord = require("discord.js");
const helpMessages = require("./functions/helpMessages.json");

//To do:
//1. if reports doesn't exist create it
//2. Allow users to change reports channel name. 
module.exports.run = async (client,message,args,prefix,con_database) => {
	const helpMessage = helpMessages.report.replace(/\$prefix/g, `${prefix}`);
	//if help 
	if(args[0] === "help") return message.reply(`${helpMessage}`);

	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.channel.send("Couldn't find user.");
	let reason = args.join(" ").slice(22);

	let reportEmbed = new Discord.RichEmbed()
	.setDescription("Reports")
	.setColor("#15f153")
	.addField("Reported User", `${rUser} with ID: ${rUser.id}`)
	.addField("Reported By", `${message.author} with ID: ${message.author.id}`)
	.addField("Channel", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", reason);

	let reportsChannel = message.guild.channels.find(c => c.name === "reports");
	if(!reportsChannel) return message.channel.send("Couldn't find reports channel. Please create a text channel called \"reports.\"");

	message.delete().catch(O_o =>{});
	reportsChannel.send(reportEmbed);
}

module.exports.help = {
	name: "report"
}