const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
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