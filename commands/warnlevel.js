const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json","utf8"));

//Allow any user (not just mods) to check their warning levels
module.exports.run = async (client, message, args) => {

	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have permission to do that.");
	let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if(!wUser) return message.reply("Couldn't find specified user.");
	let warnlevel = warns[wUser.id].warns;
	
	message.reply(`<@${wUser.id}> has ${warnlevel} warnings.`);
}

module.exports.help = {
	name: "warnlevel"
}