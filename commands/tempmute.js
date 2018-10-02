const Discord = require("discord.js")
const ms = require("ms");

//To do and tests
//Add rich embed, send message to incidents channel and delete message in chat
//Generalize hex colors
//If incidents doesnt exist, create it
//Allow users to change incidents channel name
module.exports.run = async (client, message, args) => {
	//!tempmute @user <time>
	let  toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!toMute) return message.reply("Couldn't find user.");
	if(toMute.hasPermission("MANAGE_MESSAGES")) return message.reply("This user can't be muted.")
	let muteRole= message.guild.roles.find(r => r.name === "muted");
	
	//If mute role doesn't exist, create it:
	if(!muteRole){
		try{
			muteRole = await message.guild.createRole({
				name: "muted",
				color: "#f4df42",
				permissions: []
			})//end muteRole

			message.guild.channels.forEach(async (channel, id) =>{
				await channel.overwritePermissions(muteRole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				});//end channel.overwitePermission
			});//end forEach
		}//end try 
		catch(e){
			console.log(e.stack);
		}//end catch
	}//end if
	//end of create role

	let muteTime = args[1];
	if(!muteTime) return message.reply("You didn't speficy a time.");

	await(toMute.addRole(muteRole.id));
	message.reply(`<@${toMute.id}> has been muted for ${ms(ms(muteTime))}.`);

	setTimeout(function(){
		toMute.removeRole(muteRole.id);
		message.channel.send(`<@${toMute.id}> has been unmuted.`);
	}, ms(muteTime));
//end of module
}

module.exports.help = {
	name: "tempmute"
}