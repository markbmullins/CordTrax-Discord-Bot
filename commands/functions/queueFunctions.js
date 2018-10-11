const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtubeApiKey = process.env.API_KEY;
const youtube = new YouTube(process.env.API_KEY);
const maxQueueSize = 150000;

module.exports = {
	addToQueue: async function addToQueue(queueName, url, message, con_database){
		return new Promise(
			function(resolve, reject){
				con_database.query(`SELECT * FROM queues WHERE userid = '${message.author.id}' and queuename = '${queueName}'`, 
					(err, result) =>{
						if(err) reject(err);
						else{
							let query;
							if(!result.rows[0]){
								url = url + ";";
								query = `INSERT INTO queues (userid, queueName, queue) VALUES ('${message.author.id}', '${queueName}', '${url}')`;
							} 
							else{
								let currentQueue = result.rows[0].queue;
								if (currentQueue.length == maxQueueSize){ //length of medium text
									return message.reply("Your queue has reached it's max size limit.");
								}
								currentQueue = currentQueue + url + ";";
								query = `UPDATE queues SET queue = '${currentQueue}' WHERE userid = '${message.author.id}' and queuename = '${queueName}'`;
							}
						resolve(con_database.query(query));
						}//end else
					}//end (err,result) =>
				)//end con_database.query
			}//end function
		);//end Promise
	},//end addToQueue();
	getMetadata: function getMetadata(url) {
		return new Promise((resolve, reject) => {
	    	YTDL.getBasicInfo(url, 
	    		(error, info) => {
	      			if (error) reject(error);
	      			resolve(info);
	    		});
	  	});
	},
	getQueue: async function getQueue(queueName, message, con_database){
		return new Promise(
			(resolve, reject) => {
				con_database.query(`SELECT * FROM queues WHERE userid = '${message.author.id}' and queuename = '${queueName}'`, 
					(err, result) =>{
						if(err) reject(err);
						else{
							if(!result.rows[0]){
								let queueArray = [];
								resolve(queueArray);
							}//end if
							else{
								let currentQueue = result.rows[0].queue;
								let queueArray = currentQueue.split(";");
								queueArray.pop(); //Last semicolon results in empty element of array at the end
								resolve(queueArray);
							}//end else
						}//end else
					}//end (err,result) =>
				);//end con_datbase.query
			}//end function
		);//end promise
	},//end getQueue();
	getURL: async function getURL(message, song){
			var url;
			try{
				var videos = await youtube.searchVideos(song, 10);
				//console.log(videos);
				//console.log(videos);
				let index = 0;
				message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.`);//end message.send
				try{
					var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
									maxMatches: 1,
									time: 10000,
									errors: ['time']
								});
				}//end try
				catch(err){
					//console.error(err);
					return message.channel.send('No or invalid value entered, cancelling video selection.');
				}//end catch
				const videoIndex = parseInt(response.first().content);
				url = "https://www.youtube.com/watch?v=" + videos[videoIndex - 1].id;

			}//end try
			catch(err){
				console.error(err);
				return message.channel.send('I could not obtain any search results.');
			}//end catch
			return url;
	},//end getUrl
	getTitles: async function getTitles(queue){
		var titles=[];
		var count = 0;
		return new Promise(async (resolve, reject) => {
			for(count = 0; count < queue.length; count++){
				var result = await this.getMetadata(queue[count]);
				titles[count] = result.title;
			}
			resolve(titles);
			reject("Bad parameter");
		});//end promise
	},//end getTitiles
	updateQueue: async function updateQueue(queue, queueName, message, con_database){
		return new Promise((resolve, reject) => {
			//Parsing queue back into string of URLs
			let queueString = "";
			let count;
			for(count = 0; count < queue.length; count++){
				queueString = queueString + queue[count] + ";";
			}
			//Updating database
			let query = `UPDATE queues SET queue = '${queueString}' WHERE userid = '${message.author.id}' and queuename = '${queueName}'`;
			resolve(con_database.query(query));
			reject("Bad parameter");
		});//end promise
	}//end updatequeue
};//end module.exports