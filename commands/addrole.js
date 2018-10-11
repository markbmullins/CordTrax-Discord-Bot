const Discord = require("discord.js");
const helpMessages = require("./functions/helpMessages.json");

module.exports.run = async (client,message,args,prefix,con_database) => {
	//!addrole @user <role(case sensitive)>
	const helpMessage = helpMessages.addrole.replace(/\$prefix/g, `${prefix}`);
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
	let gRole = message.guild.roles.find(r => r.name == role);
	if (!gRole) return message.reply("Couldn't find that role.")

	//Giving user role and sending DM or messaging in server.
	if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
	await(rMember.addRole(gRole.id));

	try{
		await rMember.send(`You have been given the role: ${gRole.name}`)
	}catch(e){
		message.channel.send(`<@${rMember.id}> has been given the role ${gRole.name}.`)
	}

}

module.exports.help = {
	name: "addrole"
}