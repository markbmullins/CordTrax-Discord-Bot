const envFile = require("../env");
const getYoutubeApiKey = () => {
  return envFile.API_KEY;
};
module.exports = getYoutubeApiKey;
