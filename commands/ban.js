const Discord = require("discord.js");
const helpMessages = require("./functions/helpMessages.json");
	
//Tests and to do:
//1. See if Admin can ban user (functionality check)
//2. See if regular user can ban user (permissions check)
//3. Generalize "incidents" and allow user to modify channel name.
//4. Change color to deep red and generalize color scheme (create red variable)
//5. if incidents doesn't exist create it
module.exports.run = async (client,message,args,prefix,con_database) => {
	const helpMessage = helpMessages.ban.replace(/\$prefix/g, `${prefix}`);
	//if help 
	if(args[0] === "help") return message.reply(`${helpMessage}`);
	
	//Parsing input
	let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!bUser) return message.channel.send("Couldn't find user.");
	let bReason = args.join(" ").slice(22);
	
	//If banner doesn't have permissions
	if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You do not have permission to do that.");
	
	//If bannee has mod permissions:
	if(bUser.hasPermission("MANAGE_MEMBERS")) return message.channel.send("That person can't be banned.")

	//Creating rich embed for ban function
	let banEmbed = new Discord.RichEmbed()
	.setDescription("~Ban~")
	.setColor("#15f153") 
	.addField("Banned User", `${bUser} with ID: ${bUser.id}`)
	.addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
	.addField("Banned In", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", bReason);

	//Sending ban message in incidents channel.
	let banChannel = message.guild.channels.find(c => c.name === "incidents");
	if(!banChannel) return message.channel.send("Can't find incidents channel. Please create a text channel called \"incidents.\"");
	
	//Banning user
	message.guild.member(bUser).ban(bReason); 
	banChannel.send(banEmbed);
}

module.exports.help = {
	name: "ban"
}