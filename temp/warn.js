const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const helpMessages = require("../helpMessages.json.js");

//To do
//If incidents doesnt exist, create it
//Allow users to change incidents channel name

module.exports.run = async (client, message, args, prefix, con_database) => {
  const helpMessage = helpMessages.warn.replace(/\$prefix/g, `${prefix}`);
  //if help
  if (args[0] === "help") return message.reply(`${helpMessage}`);
  //!warn @user <reason>
  if (!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.reply("You don't have permission to do that.");
  let wUser =
    message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!wUser) return message.reply("Couldn't find specified user.");
  if (wUser.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You cannot give warnings to this user.");
  let reason = args.join(" ").slice(22);

  //If no warnings for user, create entry in warnings file for user
  if (!warns[wUser.id])
    warns[wUser.id] = {
      warns: 0,
    };
  warns[wUser.id].warns++; //Apply warning to user
  //Write to warnings file.
  fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
    if (err) console.log(err);
  });

  let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warns")
    .setColor("#fc6400")
    .setAuthor(message.author.username)
    .addField("Warned User", wUser.id)
    .addField("Warned In", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason);

  let warnChannel = message.guild.channels.find(c => c.name === "incidents");
  if (!warnChannel)
    return message.reply(
      "Couldn't find incidents channel. Please create a text channel called incidents."
    );
  warnChannel.send(warnEmbed);

  if (warns[wUser.id].warns == 2) {
    let muterole = message.guild.roles.find(r => r.name === "muted");
    //If mute role doesn't exist, create it:
    if (!muteRole) {
      try {
        muteRole = await message.guild.createRole({
          name: "muted",
          color: "#f4df42",
          permissions: [],
        }); //end muteRole

        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muteRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
          }); //end channel.overwitePermission
        }); //end forEach
      } catch (e) {
        //end try
        console.log(e.stack);
      } //end catch
    } //end if
    //end of create role

    let muteTime = "30m";
    if (wUser.roles.has(muteRole.id)) return message.reply(`${wUser.id} is already muted.`);
    await wUser.addRole(muteRole.id);
    message.chanel.send(`${wUser.id} has been temporarily muted.`);
    setTimeout(function() {
      wUser.removeRole(muteRole.id);
      message.reply(`${wUser.id} has been  unmuted.`);
    }, ms(muteTime));
  }
  if (warns[wUser.id].warns == 3) {
    message.guild.member(wUser).ban(reason);
    message.send(`${wUser.id} has been banned.`);
  }
};

module.exports.help = {
  name: "warn",
};
