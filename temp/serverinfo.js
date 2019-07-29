const Discord = require("discord.js");
const helpMessages = require("../helpMessages.json.js");

module.exports.run = async (client, message, args, prefix, con_database) => {
  const helpMessage = helpMessages.serverinfo.replace(/\$prefix/g, `${prefix}`);
  //if help
  if (args[0] === "help") return message.reply(`${helpMessage}`);
  let serverIcon = message.guild.iconURL;
  let serverEmbed = new Discord.RichEmbed()
    .setDescription("Server information")
    .setColor("#15f153")
    .setThumbnail(serverIcon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You joined on", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);
  return message.channel.send(serverEmbed);
};

module.exports.help = {
  name: "serverinfo",
};
