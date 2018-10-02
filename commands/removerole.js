const Discord = require("discord.js");

module.exports.run = async (client, message, args) =>{
	//!removerole @user <role(case sensitive)>

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

	//Removing user role.
	if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
	await(rMember.removeRole(gRole.id));

	try{
		await message.member.send(`<@${rMember.id}> has been stripped of the role ${gRole.name}.`)
	}catch(e){
		message.channel.send(`<@${rMember.id}> we tried to DM you a confirmation but your DMs are locked.`)
	}


}

module.exports.help = {
	name: "removerole"
}