const getMetadata = require('./getMetadata.js');

var getTitle = async function (url){
    return new Promise(async (resolve, reject) => {
        var title = "";
        var result = await this.getMetadata(url);
        title = result.title;
        resolve(title);
        reject("Bad parameter");
    });//end promise
};

module.exports = getTitle;