const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtubeApiKey = process.env.API_KEY;
const youtube = new YouTube(process.env.API_KEY);
const maxQueueSize = 150000;

module.exports = {
	createTitlesEmbed: function createTitlesEmbed(titles, queueName){
		var count;
		for(count = 0; count < titles.length; count++){
			titles[count] = `${count+1}. ${titles[count]}` ;
		}
		var titlesString = "";
		for(count = 0; count < titles.length; count++){
			titlesString = titlesString + titles[count] + "\n";	
		}

		let queueEmbed = new Discord.RichEmbed();
		queueEmbed.setTitle(`In queue ${queueName}:`);
		queueEmbed.setColor("#15f153");
		queueEmbed.setDescription(titlesString);
		return queueEmbed;
	},
	createTitlesString: function createTitlesString(titles, queueName){
		var count;
		for(count = 0; count < titles.length; count++){
			titles[count] = `${count+1}. ${titles[count]}` ;
		}
		var titlesString = "";
		for(count = 0; count < titles.length; count++){
			titlesString = titlesString + titles[count] + "\n";	
		}
		return titlesString;
	},
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
	},//end getTitles
	getTitle: async function getTitle(url){
		return new Promise(async (resolve, reject) => {
			var title = "";
			var result = await this.getMetadata(url);
			title = result.title;
			resolve(title);
			reject("Bad parameter");
		});//end promise
	},//end getTitles
	getMetadata: function getMetadata(url) {
		return new Promise((resolve, reject) => {
	    	YTDL.getBasicInfo(url, 
	    		(error, info) => {
	      			if (error) reject(error);
	      			resolve(info);
	    		});
	  	});
	},
	getURL: async function getURL(message, song){
			var url;
			try{
				var videos = await youtube.searchVideos(song, 10);
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
	song: class Song{
		constructor(title, url){
		    this._title = title;
			this._URL = url;
		}
		get title(){
			return this._title;
		}
		get URL(){
			return this._URL;
		}
		updateURL(message){
			this._URL = this.getUrl(message,this._title);
		}
		updateTitle(){
			return;
		}
	},	
	queue: class Queue{
	    constructor(name){
	    	this._name = name;
	    	this._songs = [];
	    }
	    addSong(song){
	    	this._songs.push(song);
	    }
	    get length(){
			return this._songs.length;
	    }
	    get name() {
	        return this._name;
	    }
		get titles() {
			var numSongs = this._songs.length;
			var titles = []
			for(var i=0; i<numSongs; i++){
				titles[i] = this._songs[i].title;
			}
	        return titles;
	    }
	    get URLs(){
	    	var numSongs = this._songs.length;
			var URLs = []
			for(var i=0; i<numSongs; i++){
				URLs[i] = this._songs[i].URL;
			}
	        return URLs;
	    }
	},
	parseToQueue: async function parseToQueue(json){
		const Queue = this.queue;
		const Song = this.song;
		var parse = JSON.parse(json);
		parse._songs = parse._songs.map(song => Object.assign(new Song, song));
		var queue = Object.assign(new Queue, parse);
		return queue;
	},
	getQueue: async function getQueue(queueName, message, con_database){
		return new Promise(
			(resolve, reject) => {
				con_database.query(`SELECT * FROM queues WHERE userid = '${message.author.id}' and queuename = '${queueName}'`, 
					(err, result) =>{
						if(err) reject(err);
						else{
							//console.log("Result: ", result);
							if(!result.rows[0]){
								var flag = false;
								resolve(flag);
							}//end if
							else{
								var queue = result.rows[0].queue;
								//Last semicolon results in empty element of array at the end
								resolve(this.parseToQueue(queue));
							}//end else
						}//end else
					}//end (err,result) =>
				);//end con_datbase.query
			}//end function
		);//end promise
	},//end getQueue();
	/*
	//Follow get queue, parse each one
	getAllQueues: async function getAllQueues(message, con_database){
		return new Promise(
			(resolve, reject) => {
				con_database.query(`SELECT * FROM queues WHERE userid = '${message.author.id}'`, 
					(err, result) =>{
						if(err) reject(err);
						else{
							if(!result.rows[0]){
								let queues = [];
								resolve(queues);
							}//end if
							else{
								let queues = [];
								let i = 0;
								result.rows.forEach(element=>{
									queues[i] = result.rows[i].queuename;
									i++;
								});
								resolve(queues);
							}//end else
						}//end else
					}//end (err,result) =>
				);//end con_datbase.query
			}//end function
		);//end promise
	},//end getQueue();*/
	insertNewInDatabase: async function insertNewInDatabase(queue, message, con_database){
		queueName = queue.name;
		return new Promise(
			function(resolve, reject){
				var stringify = JSON.stringify (queue);
				let query = `INSERT INTO queues (userid, queueName, queue) VALUES ('${message.author.id}', '${queueName}', '${stringify}')`;
				resolve(con_database.query(query));
			}//end function
		);//end Promise
	},//end addToQueue();
	updateDatabase: async function updateDatabase(queue, message, con_database){
		var queueName = queue.name;
		return new Promise((resolve, reject) => {
			var stringify = JSON.stringify (queue);
			let query = `UPDATE queues SET queue = '${stringify}' WHERE userid = '${message.author.id}' and queuename = '${queueName}'`;
			resolve(con_database.query(query));
			reject("Bad parameter");
		});//end promise
	},//end updatequeue
	deleteQueue: async function deleteQueue(queueName, message, con_database){
		return new Promise((resolve, reject) => {
			//Updating database
			let query = `DELETE FROM queues WHERE queuename = '${queueName}' AND userid = '${message.author.id}'`;
			resolve(con_database.query(query));
			reject("Bad parameter");
		});//end promise
	}//end updatequeue
};//end module.exports