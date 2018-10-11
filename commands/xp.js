const Discord = require("discord.js");
const helpMessages = require("./functions/helpMessages.json");

//To do:
//Add message.channel.send into a RichEmbed
module.exports.run = async (client, message, args, prefix, con_database) => {
	const helpMessage = helpMessages.xp.replace(/\$prefix/g, `${prefix}`);
	//if help 
	if(args[0] === "help") return message.reply(`${helpMessage}`);
	
	//           get first person mentioned     or search guild for ID                or person who sent message
	let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
	
	//Getting xp from database:
	con_database.query(`SELECT * FROM xp WHERE id ='${target.id}' and guildid = '${message.guild.id}'`, (err,result) => {
		if(err) throw err;
		if(!result.rows[0]) return message.channel.send("This user has no XP on record.");
		let xp = result.rows[0].xp;
		message.channel.send(xp);
	});

}

module.exports.help = {
	name: "xp"
}
