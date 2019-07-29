const Discord = require("discord.js");
const queueFunctions = require("../utils/queueFunctions");
const helpMessages = require("../helpMessages.json.js");

async function createEmbed(string) {
  console.log("STRING:", string);
  let queuesEmbed = new Discord.RichEmbed().addField("Queues:", `${string}`).setColor("#15f153");
  return queuesEmbed;
}

module.exports.run = async (client, message, args, prefix, con_database) => {
  const helpMessage = helpMessages.deletequeue.replace(/\$prefix/g, `${prefix}`);
  if (args[0] === "help") {
    return message.reply(helpMessage);
  } else if (args[0]) {
    return message.reply(
      `Invalid use of the myqueues command. Type ${prefix}myqueues help for help.`
    );
  } else {
    var queues = await queueFunctions.getAllQueues(message, con_database);
    if (queues.length === 0) {
      return message.reply("You don't have any queues. Please use the add command to create some.");
    }
    var queueString = "1. " + queues[0] + "\n";
    for (count = 1; count < queues.length; count++) {
      queueString = queueString + `${count + 1}. ` + queues[count] + "\n";
    }

    let queuesEmbed = await createEmbed(queueString);
    return message.channel.send(queuesEmbed);
  } //end else
}; //end module

module.exports.help = {
  name: "myqueues",
};
