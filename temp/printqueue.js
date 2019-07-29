const Discord = require("discord.js");
const queueFunctions = require("../utils/queueFunctions");
const helpMessages = require("../helpMessages.json.js");

module.exports.run = async (client, message, args, prefix, con_database) => {
  const helpMessage = helpMessages.printqueue.replace(/\$prefix/g, `${prefix}`);
  //!inqueue
  if (!args[0]) {
    message.reply("Please provide a queue to look up.");
    return message.reply(helpMessage);
  } //end if
  //!inqueue help
  else if (args[0] === "help") {
    return message.reply(helpMessage);
  } //end else if
  //!inqueue <args[0]>
  else {
    var queue = await queueFunctions.getQueue(args[0], message, con_database);
  } //end else

  if (queue.length < 1) {
    message.reply(
      `This queue is empty or does not exist. Use the add command to add songs to a queue. For help adding songs to your queue, type ${prefix}add help.`
    );
  } else if (queue.length >= 1) {
    var titles = await queueFunctions.getTitles(queue);
    queueEmbed = queueFunctions.createTitlesEmbed(titles, args[0]);
    return message.channel.send(queueEmbed);
  }
}; //End module.exports.run()

module.exports.help = {
  name: "printqueue",
};
