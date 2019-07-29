const queryDB = commandsDTO => {
  return commandsDTO.databaseConnection
    .query(commandsDTO.queryString)
    .then(res => {
      return res;
    })
    .catch(e => console.error(e.stack));
};

module.exports = queryDB;
