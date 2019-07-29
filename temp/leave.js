const Discord = require("discord.js");
const helpMessages = require("../helpMessages.json.js");
module.exports.run = async (client, message, args, prefix, con_database) => {
  const helpMessage = helpMessages.leave.replace(/\$prefix/g, `${prefix}`);
  //if help
  if (args[0] === "help") return message.reply(`${helpMessage}`);
  if (message.guild.voiceConnection) {
    //Checks if bot is in voice channel
    if (message.member.voiceChannel === message.guild.me.voiceChannel) {
      //Checks if bot is in same  channel as messager
      message.guild.voiceConnection.disconnect(); //Leave
    } else {
      message.reply("You must be in the same channel as me for me to leave.");
    }
  } else {
    message.reply("I am not in a voice channel.");
  }
};

module.exports.help = {
  name: "leave",
};
