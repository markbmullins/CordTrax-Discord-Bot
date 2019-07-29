const queryDB = require("./queryDB");

const initializePrefix = async commandsDTO => {
  const message = commandsDTO.message;
  const selectPrefixQuery = `SELECT * FROM prefixes WHERE guildid = '${message.guild.id}'`;
  const insertPrefixQuery = `INSERT INTO prefixes (guildid, prefix) VALUES ('${message.guild.id}', '${process.env.prefix}')`;

  commandsDTO.queryString = selectPrefixQuery;
  const result = await queryDB(commandsDTO);
  if (!result.rows[0]) {
    console.log("No prefix found for guild. Inserting default prefix");
    commandsDTO.queryString = insertPrefixQuery;
    //Insert prefix into table
    await queryDB(commandsDTO);
    commandsDTO.prefix = process.env.prefix;
  } else {
    commandsDTO.prefix = result.rows[0].prefix;
  }
};

module.exports = initializePrefix;
