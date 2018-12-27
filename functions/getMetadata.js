const YTDL = require("ytdl-core");

//typeOf(url) === 'String'
var getMetadata = function (url) {
    return new Promise((resolve, reject) => {
        YTDL.getBasicInfo(url, 
            (error, info) => {
                  if (error) reject(error);
                  resolve(info);
            });
      });
};

module.exports = getMetadata;