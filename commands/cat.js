const Discord = require("discord.js");
const superagent = require("superagent");
const helpMessages = require("./functions/helpMessages.json");

module.exports.run = async (client,message,args,prefix,con_database) => {
	const helpMessage = helpMessages.cat.replace(/\$prefix/g, `${prefix}`);
	//if help 
	if(args[0] === "help") return message.reply(`${helpMessage}`);
	let {body} = await superagent
	.get(`https://aws.random.cat/meow`);

	let catEmbed = new Discord.RichEmbed()
	.setColor("#15f153")
	.setTitle("Cat")
	.setImage(body.file);

	message.channel.send(catEmbed);
	
}

module.exports.help = {
	name: "cat"
}