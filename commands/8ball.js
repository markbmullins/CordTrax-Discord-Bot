const Discord = require("discord.js");
const helpMessages = require("./functions/helpMessages.json");

module.exports.run = async (client,message,args,prefix,con_database) => {
	const helpMessage = helpMessages.eightball.replace(/\$prefix/g, `${prefix}`);
	//!8ball <question afadfasdfa>
	if(args[0] === "help") return message.reply(`${helpMessage}`);
	if(!args[1]) return message.reply("Please ask a full question.");
	let replies = ["Yes.","No.","Maybe.","Ask me again later.","I don't know."];

	let result = Math.floor((Math.random() * replies.length));
	let question = args.slice(0).join(" ");

	let ballEmbed = new Discord.RichEmbed()
	.setAuthor(message.author.tag)
	.setColor("#15f153")
	.addField("Question", question)
	.addField("Answer", replies[result]);

	message.channel.send(ballEmbed);
}

module.exports.help = {
	name: "8ball"
}
