const Discord = require("discord.js");
const fs = require("fs");
const helpMessages = require("./functions/helpMessages.json");

module.exports.run = async (client,message,args,prefix,con_database) => {
	const helpMessage = helpMessages.prefix.replace(/\$prefix/g, `${prefix}`);
	if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You don't have permission to change the prefix on this server.");
	if(!args[0] || args[0] == "help") return message.reply(helpMessage);
	let setPrefix = await con_database.query(`UPDATE prefixes SET prefix = '${args[0]}' WHERE guildid = '${message.guild.id}'`);
	let prefixEmbed = new Discord.RichEmbed()
	.setColor("#15f153")
	.setTitle("Prefix Set")
	.setDescription(`Set to ${args[0]}`);
	message.channel.send(prefixEmbed);
}

module.exports.help = {
	name: "prefix"
}

	/*
	if(cmd ===`${prefix}prefix`){
    	var new_prefix = String(args[0]);
    	var dataJSON = fs.readFileSync("config.json", "utf-8");
    	var data = JSON.parse(dataJSON);
    	data.prefix = new_prefix;
    	fs.writeFileSync("config.json", JSON.stringify(data), "utf-8");
		prefix = config.prefix;
    	prefix_length = prefix.length;
    	message.channel.send("Your new prefix is: " + prefix);

	}*/