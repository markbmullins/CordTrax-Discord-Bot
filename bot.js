const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();

client.login(process.env.token);

client.on("ready", async () => {
    console.log(`${client.user.username} is online on ${client.guilds.size} servers.`);
});

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    const jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }
    jsfile.forEach((f, i) => {
        const props = require(`./commands/${f}`);
        console.log(`${f} loaded.`);
        client.commands.set(props.help.name, props);
    });
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    const prefix = "!";
    const messageContent = message.content.split(" ");
    const cmd = messageContent[0].toLowerCase();
    if (cmd.substring(0, prefix.length) !== prefix) return;
    const args = messageContent.slice(1);
    const commandfile = client.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, args);
    else return message.reply(`Invalid command.`);
});
