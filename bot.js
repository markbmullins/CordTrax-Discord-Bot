const Discord = require("discord.js"); // includes the discord.js node package
const client = new Discord.Client(); // Client class of the npm package to interact with the discord api
const fs = require("fs"); // includes the file system package
const commandsDTO = require("./models/commandsDTO.js");
const connectToDatabase = require("./utils/connectToDatabase");
const giveMemberXp = require("./utils/giveMemberXp");
const importCommands = require("./utils/importCommands");
const queryDB = require("./utils/queryDB");
const initializePrefix = require("./utils/initializePrefix");
const Logger = require("./utils/logger");

client.commands = new Discord.Collection();
require("dotenv").config();

// Logs in to the application.
client.login(process.env.token);

// New logger instance
const log = new Logger({ showTime: false });
commandsDTO.log = log;

// Online message
client.on("ready", async () => {
  log.info(`${client.user.username} is online on ${client.guilds.size} servers.`);
});

// Command Handler:
readCommands();

if (process.env.SHOULD_CONNECT_TO_DB) connectToDatabase(commandsDTO);
if (commandsDTO.databaseConnection !== null) log.info("Connection to DB set in DTO");

// When a message is recieved by the bot
client.on("message", async message => {
  // If message was sent by a bot
  if (message.author.bot) return;

  // If message is a DM
  if (message.channel.type === "dm") return;
  commandsDTO.message = message;

  if (commandsDTO.prefix === null) await initializePrefix(commandsDTO);

  const { enteredCommand, enteredPrefix, args } = parseMessage();

  // If message does not start with the prefix, update XP
  if (enteredPrefix !== commandsDTO.prefix) {
    return giveMemberXp(commandsDTO);
  } else {
    log.info(`User ${message.author.username} called command ${enteredCommand} with args: ${args}`);
    commandsDTO.args = args;
    commandsDTO.client = client;
    const commandfile = client.commands.get(enteredCommand);

    // if command exists, run it
    if (commandfile) {
      commandfile.run(commandsDTO);
    } else {
      // If help does not exist and the user asked for help:
      if (enteredCommand === "help") {
        return message.reply(`Help seems to be unavailable right now. Sorry.`);
      }
      return message.reply(`Invalid command. Type ${commandsDTO.prefix}help for help.`);
    }
  }
});

client.on("voiceStateUpdate", (oldMemberState, newMemberState) => {
  /*
   *  Whenever a user leaves a channel, check if there are temporary channels in the commandsDTO
   *  if there are, check if any of those channels have no members in them.
   *  If they are empty, delete the channel.
   */
  const tempChannels = commandsDTO.temporaryChannels;
  if (!tempChannels) return;
  tempChannels.forEach(channel => {
    // If user is leaving a temporary channel
    if (
      oldMemberState &&
      oldMemberState.voiceChannel &&
      oldMemberState.voiceChannelID === channel.id
    ) {
      // for each temporary channel, if it is empty delete it
      tempChannels.forEach(chan => {
        if (chan && chan.members && chan.members.size === 0) {
          chan.delete("").catch(err => {
            if (err) console.log(err);
          });
        }
      });
    }
  });
});

// to do
// 1. Check if channel welcome_leave exists
// 2. if not create channel
// 3. Allow users to change welcome_leave name.
client.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server.`);
  let welcomeChannel = member.guild.channels.find(c => c.name === "welcome_leave");
  welcomeChannel.send(`${member} has joined the server.`);
});

// to do
// 1. Check if channel welcome_leave exists
// 2. if not create channel
// 3. Allow users to change welcome_leave name.
client.on("guildMemberRemove", async member => {
  console.log(`${member.id} left the server.`);
  let welcomeChannel = member.guild.channels.find(c => c.name === "welcome_leave");
  welcomeChannel.send(`${member} has left the server.`);
});

function readCommands() {
  fs.readdir("./commands/", (err, files) => {
    if (err) log.error(`Error reading commands: ${err}`);

    const jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
      log.error("Couldn't find commands.");
      return;
    }

    // loading each .js file
    jsfile.forEach((f, i) => {
      const props = require(`./commands/${f}`);
      log.info(`${f} loaded.`);

      // Adding command files to the commands map
      client.commands.set(props.help.name, props);
    });
  });
}

function parseMessage() {
  const [commandAndPrefix, ...args] = commandsDTO.message.content.split(" ");
  if (!commandAndPrefix) return;
  const enteredCommand = commandAndPrefix.substring(commandsDTO.prefix.length).toLowerCase(); // type: string | includes prefix at this point
  const enteredPrefix = commandAndPrefix.substring(0, commandsDTO.prefix.length);

  return { enteredCommand, enteredPrefix, args };
}

// To do
// Create command channelnotifications <on/off> that allows user to turn off channel notifications
/*client.on("channelCreate", async channel =>{
	try{
		console.log(`${channel.name} has been created.`);
		let sChannel = channel.guild.channels.find(c => c.name === "general");
		sChannel.send(`${channel} has been created.`);
	}catch(err){
		console.log("Error: ", err);
	}
});

client.on("channelDelete", async channel =>{

	console.log(`${channel.name} has been deleted.`);
	let sChannel = channel.guild.channels.find(c => c.name === "general");
	sChannel.send(`${channel.name} has been deleted.`);
});
*/
