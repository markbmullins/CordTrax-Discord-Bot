const Discord = require("discord.js");
const helpMessages = require("./functions/helpMessages.json");

module.exports.run = async (client,message,args,prefix,con_database) =>{
	//!removerolenotify @user <role(case sensitive)>
	const helpMessage = helpMessages.removerolenotify.replace(/\$prefix/g, `${prefix}`);
	//if help 
	if(args[0] === "help") return message.reply(`${helpMessage}`);

	//Checking permissions of person sending message
	if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You don't have permission to do that.");
	
	//Making sure user exists
	let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rMember) return message.reply("Couldn't find specified user.");
	
	//Making sure role isn't blank
	let role =  args.join(" ").slice(22);
	if (!role) return message.reply("Please specify a role.");
	
	//Making sure role exists in server
	let gRole = message.guild.roles.find( r => r.name == role);
	if (!gRole) return message.reply("Couldn't find that role.")

	//Removing user role and sending DM or messaging in server.
	if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
	await(rMember.removeRole(gRole.id));

	//Notifying User:
	try{
		await rMember.send(`Your role ${gRole.name} has been removed.`)
	}catch(e){
		message.channel.send(`The role ${gRole.name} has been removed from <@${rMember.id}>.`)
	}
}

module.exports.help = {
	name: "removerolenotify"
}