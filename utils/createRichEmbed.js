const Discord = require("discord.js");

var createRichEmbed = async function(
  songTitle,
  songLength,
  thumbnailURL,
  message,
  queueName,
  databaseConnection
) {
  let addEmbed = new Discord.RichEmbed();
  if (queueName == "defaultQueue") {
    addEmbed.setDescription(`Added ${songTitle} to your default queue.`);
  } else {
    addEmbed.setDescription(`Added ${songTitle} to the queue ${queueName}.`);
  }
  addEmbed.setColor("#15f153");
  addEmbed.setThumbnail(thumbnailURL);
  addEmbed.addField("Song Length:", this.fancyTimeFormat(songLength));
  return message.channel.send(addEmbed);
};

module.exports = createRichEmbed;
