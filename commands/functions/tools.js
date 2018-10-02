const Discord = require("discord.js");
const queueFunctions = require("./queueFunctions");
module.exports = {
	
	fancyTimeFormat: function fancyTimeFormat (time){   
	    // Hours, minutes and seconds
	    var hrs = ~~(time / 3600);
	    var mins = ~~((time % 3600) / 60);
	    var secs = time % 60;

	    // Output like "1:01" or "4:03:59" or "123:03:59"
	    var ret = "";

	    if (hrs > 0) {
	        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
	    }//end if
	    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
	    ret += "" + secs;
	    return ret;
	},//end fancyTimeFormat

	createRichEmbed: async function createRichEmbed(songTitle, songLength, thumbnailURL, message, queueName, con_database){
		let addEmbed = new Discord.RichEmbed();
		if(queueName == "defaultQueue"){
			addEmbed.setDescription(`Added ${songTitle} to your default queue.`);
		}else{
			addEmbed.setDescription(`Added ${songTitle} to the queue ${queueName}.`);
		}
		addEmbed.setColor("#15f153");
		addEmbed.setThumbnail(thumbnailURL);
		addEmbed.addField("Song Length:", this.fancyTimeFormat(songLength));
		return message.channel.send(addEmbed);
    },

    inputParse: async function inputParse(message,args,prefix,helpMessage){ //Returns queueName and URL
		let url;
		let song=false;
		let queue;
		let regex = /^(https:\/\/)?(www.)?youtube.com\//;
	    let defaultQueue = "defaultQueue";
		if(args[1]){
			//if !add <"song">
			if(args[0].startsWith("\"")){
				//Parsing input
				queue = defaultQueue;
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
			}//end else if(args[0].startsWith("\"")
			//Catching single quotes error
			else if(args[1].startsWith("\'")){
				return message.reply("Please use double quotes (\"song name\") instead of single quotes.");
			}//end if(args[1].substring(0,1)
			//if !add <queue> <song>
			else if(args[1].startsWith("\"")){
				//Parsing input
				queue = args[0];
				args[1] = args[1].replace("\"",""); //removes first "
				if(args[1].endsWith("\"")){
					args[1] = args[1].slice(0, -1); //removes last "
					song = args[1];
				}//end if	
				else{
					tempArgs = args.slice(2);
					let index=0;
					let strPosition;
					await tempArgs.forEach((element)=>{
						index+=1;
						if(element.indexOf("\"") != -1) strPosition = element.indexOf("\"");
					});
					tempArgs[index-1] = tempArgs[index-1].replace("\"","");
					song = args[1] + " " + tempArgs.join(" ");
				}//end else
			}//end else if(args[1].substring(0,1) === "\"")
			//if !add <queue> <URL>
			else if(regex.test[args[1]]){
				queue = args[0];
				url = args[1];
			}
			else{
				return message.reply(`Something went wrong. Try ${prefix}add help for help.`);
			}//end else
		}//end if(args[1])
		else{
			//!add case
			if(!args[0]){
				message.reply("Please provide a song to add to the queue.");
				return message.reply(helpMessage);
			}//end if
			//!add help case
			else if(args[0]==="help"){
				return message.reply(helpMessage);
			}//end else if
			//Catching single quotes error
			else if(args[0].startsWith("\'")){
				return message.reply("Please use double quotes (\"song name\") instead of single quotes.");
			}//end else if
			//if !add <"song"> and song is one word
			else if(args[0].startsWith("\"")){
				//console.log("Correct case");
				//Parsing input
				queue = defaultQueue;
				args[0] = args[0].replace("\"",""); //removes first "
				if(args[0].endsWith("\"")) args[0] = args[0].slice(0, -1); //removes last "
				song = args[0];
				//console.log(song);
			}//end else if(args[0].startsWith("\"")

			//if !add <URL>
			else if(regex.test(args[0]) && !args[1]){
				url = args[0];
				queue = defaultQueue;
			}//end if(args[0].search(regex) && !args[1])

			else{
				return message.reply(`Something went wrong. Try ${prefix}add help for help.`);
			}//end else
		}//end else

		if(song){
			//Getting URL
			url = await queueFunctions.getURL(message, song);
		};
		return [queue, url];
	}
};