const fs = require("fs");

const randomize = commandsDTO => {
  const message = commandsDTO.message;
  if (!message || !message.member) return message.reply("An unknown error has occurred. Sorry.");

  const currentChannel = message.member.voiceChannel;
  if (!currentChannel) return message.reply("You are not in a voice channel. Please join a voice channel and try again.");

  // Check if user provided channel names, else use defaults
  const args = commandsDTO.args;
  const firstChannelName = args[0] ? args[0] : "team1";
  const secondChannelName = args[1] ? args[1] : "team2";

  // Try and get all the members in the channel
  const membersMap = currentChannel.members;
  let members = null;
  if (membersMap) members = membersMap.array();
  if (!members) return message.reply("An unknown error has occurred. Sorry.");

  // See if the first channel already exists, if not create it
  const firstChannelExists = doesChannelExist(message.guild.channels, firstChannelName, "voice");
  console.log(firstChannelExists);
  let firstCreatePromise = null;
  if (!firstChannelExists) {
    firstCreatePromise = message.guild.createChannel(firstChannelName, { type: "voice" });
  }

  // See if the second channel already exists, if not create it
  const secondChannelExists = doesChannelExist(message.guild.channels, secondChannelName, "voice");
  let secondCreatePromise = null;
  if (!secondChannelExists) {
    secondCreatePromise = message.guild.createChannel(secondChannelName, { type: "voice" });
  }

  // Once both channels are created continue
  Promise.all([firstCreatePromise, secondCreatePromise]).then(() => {
    // Find the channel with the correct name
    const firstMap = message.guild.channels.filter(channel => channel.name === firstChannelName);
    firstChannel = firstMap.array()[0];
    const secondMap = message.guild.channels.filter(channel => channel.name === secondChannelName);
    secondChannel = secondMap.array()[0];

    if (firstChannel && secondChannel) {
      commandsDTO.temporaryChannels.push(firstChannel);
      commandsDTO.temporaryChannels.push(secondChannel);
      // For each member, move half into channelOne, other half into channelTwo
      members.forEach((member, index) => {
        if (index % 2 === 0) {
          member.setVoiceChannel(firstChannel.id);
        } else {
          member.setVoiceChannel(secondChannel.id);
        }
      });
    }
    // If for some reason channels don't exist by this point, return generic error
    else {
      return message.reply("An unknown error has occurred. Sorry.");
    }
  });
};

const doesChannelExist = (channels, name, type) => {
  if (!channels) return false;
  let flag = false;
  channels.forEach(channel => {
    if (channel.name === name && channel.type === type) flag = true;
  });
  return flag;
};

const findChannel = (channels, name, type) => {
  if (!channels) return null;
  const channelMap = channels.filter(channel => channel.name === name && channel.type === type);
  console.log("channelMap", channelMap);
  const channelArray = channelMap.array();
  console.log("channelArray", channelArray);
  console.log("Array.isArray(channelArray)", Array.isArray(channelArray));
  console.log("channelArray.size", channelArray.size);
  if (!channelArray || !Array.isArray(channelArray) || channelArray.size !== 1) return null;
  return channelArray[0];
};

module.exports.run = randomize;

module.exports.help = {
  name: "randomize",
};
