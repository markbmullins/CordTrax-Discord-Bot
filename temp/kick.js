const Discord = require("discord.js");
const helpMessages = require("../helpMessages.json.js");

//Tests and to do:
//1. See if Admin can kick user (functionality check)
//2. See if regular user can kick user (permissions check)
//3. Generalize "incidents" and allow user to modify channel name.
//4. Change color to orange and generalize color scheme (create red variable)
module.exports.run = async (client, message, args, prefix, con_database) => {
  const helpMessage = helpMessages.kick.replace(/\$prefix/g, `${prefix}`);
  //if help
  if (args[0] === "help") return message.reply(`${helpMessage}`);
  //Parsing input
  let kUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!kUser) return message.channel.send("Couldn't find user.");
  let kReason = args.join(" ").slice(22);

  //If kicker doesn't have permissions
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("You do not have permission to do that.");

  //If kickee has mod permissions:
  if (kUser.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("That person can't be kicked.");

  //Creating rich embed for kick function
  let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#15f153")
    .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

  //Sending kick message in incidents channel.
  let kickChannel = message.guild.channels.find(c => c.name === "incidents");
  if (!kickChannel)
    return message.channel.send(
      'Can\'t find incidents channel. Please create a text channel called "incidents."'
    );

  //Kicking user
  message.guild.member(kUser).kick(kReason); //Kicking user
  kickChannel.send(kickEmbed);
};

module.exports.help = {
  name: "kick",
};
