const fs = require("fs");

const randomize = commandsDTO => {
  const log = commandsDTO.log;
  const message = commandsDTO.message;
  if (!message || !message.member) return message.reply("An unknown error has occurred. Sorry.");

  const currentChannel = message.member.voiceChannel;
  if (!currentChannel)
    return message.reply(
      "You are not in a voice channel. Please join a voice channel and try again."
    );

  // Check if user provided channel names, else use defaults

  const { firstChannelName, secondChannelName } = generateChannelNames(commandsDTO.args);

  // Try and get all the members in the channel
  const members = shuffle(getMembersInVoiceChannel(currentChannel));
  if (!members) {
    log.warn("Couldn't get members from channel.");
    return message.reply("An unknown error has occurred. Sorry.");
  }

  const { firstCreatePromise, secondCreatePromise } = createTempChannels(
    message,
    firstChannelName,
    secondChannelName
  );

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
      assignMembersToChannels(members, firstChannel, secondChannel);
    }
    // If for some reason channels don't exist by this point, return generic error
    else {
      return message.reply("An unknown error has occurred. Sorry.");
    }
  });
};

function doesChannelExist(channels, name, type) {
  if (!channels) return false;
  let flag = false;
  channels.forEach(channel => {
    if (channel.name === name && channel.type === type) flag = true;
  });
  return flag;
}

function findChannel(channels, name, type) {
  if (!channels) return null;
  const channelMap = channels.filter(channel => channel.name === name && channel.type === type);
  console.log("channelMap", channelMap);
  const channelArray = channelMap.array();
  console.log("channelArray", channelArray);
  console.log("Array.isArray(channelArray)", Array.isArray(channelArray));
  console.log("channelArray.size", channelArray.size);
  if (!channelArray || !Array.isArray(channelArray) || channelArray.size !== 1) return null;
  return channelArray[0];
}

function generateChannelNames(args) {
  return {
    firstChannelName: args[0] ? args[0] : "Team-Alpha",
    secondChannelName: args[1] ? args[1] : "Team-Bravo"
  };
}

function getMembersInVoiceChannel(channel) {
  const membersMap = channel.members;
  if (membersMap) {
    return membersMap.array();
  }
}

function createTempChannels(message, firstChannelName, secondChannelName) {
  // See if the first channel already exists, if not create it
  const firstChannelExists = doesChannelExist(message.guild.channels, firstChannelName, "voice");
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

  return {
    firstCreatePromise,
    secondCreatePromise
  };
}

function assignMembersToChannels(members, channelOne, channelTwo) {
  // For each member, move half into channelOne, other half into channelTwo
  members.forEach((member, index) => {
    if (index % 2 === 0) {
      member.setVoiceChannel(channelOne.id);
    } else {
      member.setVoiceChannel(channelTwo.id);
    }
  });
}

// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.exports.run = randomize;

module.exports.help = {
  name: "randomize"
};
