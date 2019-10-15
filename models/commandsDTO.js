/*
 * commandsDTO is an object to pass necessary information for commands to and between functions

 * client: A discord.js Client object, The main hub for interacting with the Discord API, and the starting point for any bot.
 *         https://discord.js.org/#/docs/main/stable/class/Client
 *
 * message: Represents a message on Discord. This is a text message sent in a discord text channel.
 *          https://discord.js.org/#/docs/main/stable/class/Message
 *
 * prefix: The prefix used to call the bot, must start each message meant to be a bot command.
 * 
 * args: An array of arguments passed in after the command, separated by a space.
 * 
 * databaseConnection: A PostgreSQL client object. https://github.com/brianc/node-postgres
 * 
 * queryString: A string used by the PostgreSQL client to query the database. 
 * 
 * tempoaryChannels: An array of VoiceChannel objects that are temporarily kept in memory.
 *                   https://discord.js.org/#/docs/main/stable/class/VoiceChannel
 */

const commandsDTO = {
  client: null,
  message: null,
  args: [],
  prefix: "?",
  databaseConnection: null,
  queryString: null,
  temporaryChannels: [],
  log: null
};

module.exports = commandsDTO;
