const getMetadata = require('./getMetadata.js');

var getTitles = async function (queue){
    var titles=[];
    var count = 0;
    return new Promise(async (resolve, reject) => {
        for(count = 0; count < queue.length; count++){
            var result = await getMetadata(queue[count]);
            titles[count] = result.title;
        }
        resolve(titles);
        reject("Bad parameter");
    });//end promise
};

module.exports = getTitles;