const Discord = require("discord.js");

//To do:
//Add message.channel.send into a RichEmbed
module.exports.run = async (client, message, args, prefix, con_database) => {
	
	//           get first person mentioned     or search guild for ID                or person who sent message
	let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
	
	//Getting xp from database:
	con_database.query(`SELECT * FROM xp WHERE id ='${target.id}' and guildid = '${message.guild.id}'`, (err,rows) => {
		if(err) throw err;
		if(!rows[0]) return message.channel.send("This user has no XP on record.");
		let xp = rows[0].xp;
		message.channel.send(xp);
	});

}

module.exports.help = {
	name: "xp"
}
