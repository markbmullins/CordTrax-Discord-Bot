const Discord = require("discord.js");

var createTitlesEmbed = function (titles, queueName){
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
};

module.exports = createTitlesEmbed;
