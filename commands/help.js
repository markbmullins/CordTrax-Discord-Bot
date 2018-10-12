const Discord = require("discord.js");
const fs = require("fs"); //includes the file system package

module.exports.run = async (client,message,args,prefix,con_database) => {
	//const generalHelpString = fs.readFileSync("./HELP.md","utf8").replace(/```/g, "").replace(/# /g, "").replace(/#/g, "");
	//let generalHelpArray = generalHelpString.split("\r\n");
	//console.log(generalHelpArray);
	return message.reply("Please see the help documentation here https://github.com/markbmullins/CordTrax-Discord-Bot/blob/master/HELP.md");


}

module.exports.help = {
	name: "help"
}