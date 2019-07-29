const YouTube = require("simple-youtube-api");
const API_KEY = require("../utils/getYoutubeApiKey")();
const youtube = new YouTube(API_KEY);

var getURL = async function(message, song) {
  var url;
  try {
    var videos = await youtube.searchVideos(song, 10);
    let index = 0;
    message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join("\n")}
Please provide a value to select one of the search results ranging from 1-10.`); //end message.send
    try {
      var response = await message.channel.awaitMessages(
        message2 => message2.content > 0 && message2.content < 11,
        {
          maxMatches: 1,
          time: 10000,
          errors: ["time"],
        }
      );
    } catch (err) {
      //end try
      //console.error(err);
      return message.channel.send("No or invalid value entered, cancelling video selection.");
    } //end catch
    const videoIndex = parseInt(response.first().content);
    url = "https://www.youtube.com/watch?v=" + videos[videoIndex - 1].id;
  } catch (err) {
    //end try
    console.error(err);
    return message.channel.send("I could not obtain any search results.");
  } //end catch
  return url;
};

module.exports = getURL;
