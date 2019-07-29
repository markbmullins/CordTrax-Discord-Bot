const Discord = require("discord.js");
const helpMessages = require("../helpMessages.json.js");

module.exports.run = async (client, message, args, prefix, con_database) => {
  const helpMessage = helpMessages.ping.replace(/\$prefix/g, `${prefix}`);
  //if help
  if (args[0] === "help") return message.reply(`${helpMessage}`);
  message.channel.send("pong!");
};

module.exports.help = {
  name: "ping",
};
