var createTitlesString = function (titles, queueName){
    var count;
    for(count = 0; count < titles.length; count++){
        titles[count] = `${count+1}. ${titles[count]}` ;
    }
    var titlesString = "";
    for(count = 0; count < titles.length; count++){
        titlesString = titlesString + titles[count] + "\n";	
    }
    return titlesString;
};

module.exports = createTitlesString;