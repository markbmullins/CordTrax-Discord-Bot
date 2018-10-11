const Discord = require("discord.js");
const queueFunctions = require("./functions/queueFunctions");
const YTDL = require("ytdl-core");
const helpMessages = require("./functions/helpMessages.json");

function playQueue(client, connection, message){
	const streamOptions = {bitrate : 40000};
	client.queue.dispatcher = connection.playStream(YTDL(client.queue[client.queueIndex], {filter:"audioonly"}), streamOptions);
	client.queueIndex+=1;
	client.queue.dispatcher.on("end", ()=>{
		if(client.queue[client.queueIndex]){
			playQueue(client, connection, message);	
		}
		else{
			connection.disconnect();
		}
	});
}

function playSingleSong(song, connection, message){
	const streamOptions = {bitrate : 40000};
	song.dispatcher = connection.playStream(YTDL(song[0], {filter:"audioonly"}), streamOptions);
	song.dispatcher.on("end", ()=>{
			connection.disconnect();
	});
}

module.exports.run = async (client,message,args,prefix,con_database) => {
	//!play 
	//!play help
	//!play <url>
	//!play <queueName>
	//!play "song name"
	const regex = /^(https:\/\/)?(www.)?youtube.com\//;
	const voiceChannel = message.member.voiceChannel;
	var url;
	var song;
	var QueueFlag = false;
	const helpMessage = helpMessages.play.replace(/\$prefix/g, `${prefix}`);

	//Checking permissions
	if(!voiceChannel){
		return message.reply("You must be in a voice channel.")
	}
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if(!permissions.has('CONNECT')){
		return message.reply("I cannot connect to your voice channel, make sure I have the proper permissions.");
	}
	if(!permissions.has('SPEAK')){
		return message.reply("I cannot speak in this voice channel, make sure I have the proper permissions.");
	}

	//Parsing input into a URL
	if(args[1]){
		//[✔] if !play <"song">
		if(args[0].startsWith("\"")){
			args[0] = args[0].replace("\"",""); //removes first "
			tempArgs = args.slice(1);
			let index=0;
			let strPosition;
			await tempArgs.forEach((element)=>{
				index+=1;
				if(element.indexOf("\"") != -1) strPosition = element.indexOf("\"");
			});
			tempArgs[index-1] = tempArgs[index-1].replace("\"","");
			song = args[0] + " " + tempArgs.join(" ");
			url = await queueFunctions.getURL(message, song);
			notAQueueFlag = true;
		}//end else if(args[0].startsWith("\"")

		//[✔] Catching single quotes error
		else if(args[1].startsWith("\'")){
			return message.reply("Please use double quotes (\"song name\") instead of single quotes.");
		}//end if(args[1].substring(0,1)

		else{
			return message.reply(`Something went wrong. Try ${prefix}play help for help.`);
		}//end else
	}//end if(args[1])
	else{
		//[✔] !play case
		if(!args[0]){
			message.reply("Please provide a song to play.");
			return message.reply(helpMessage);
		}//end if

		//[✔] !play help case
		else if(args[0]==="help"){
			return message.reply(helpMessage);
		}//end else if

		//[✔] Catching single quotes error
		else if(args[0].startsWith("\'")){
			return message.reply("Please use double quotes (\"song name\") instead of single quotes.");
		}//end else if

		//[✔] if !add <"song"> and song is one word
		else if(args[0].startsWith("\"")){
			args[0] = args[0].replace("\"",""); //removes first "
			if(args[0].endsWith("\"")) args[0] = args[0].slice(0, -1); //removes last "
			url = await queueFunctions.getURL(message, args[0]);
			notAQueueFlag = true;
		}//end else if(args[0].startsWith("\"")

		//[✔] if !play <URL>
		else if(regex.test(args[0])){
			url = args[0];
			notAQueueFlag = true;
		}//end if(regex.test(args[0]))

		else if(!notAQueueFlag){
			client.queue = await queueFunctions.getQueue(args[0], message, con_database); //Queue should return false if it does not exist.
			client.queueIndex = 0;
			if(!client.queue[0]){
				return message.reply(`That queue does not exist. Use the add command to create a new queue or ${prefix}play help for help.`);
			}
		}//end else if (!notAQueueFlag)
		else{
			return message.reply(`Something went wrong. Use ${prefix}play help for help.`);
		}//end else
	}//end else



	if(!message.guild.voiceConnection){
		if(!notAQueueFlag){
		message.member.voiceChannel.join()
			.then(connection =>{
				playQueue(client, connection, message);
			});
		//if(message is url)
			//play URL
		}
		else{
			var songToPlay = [url];
			client.queueIndex = 0;
			message.member.voiceChannel.join()
			.then(connection =>{
				playSingleSong(songToPlay, connection, message);
			});

		}
	}//end if
}//end module



module.exports.help = {
	name: "play"
}