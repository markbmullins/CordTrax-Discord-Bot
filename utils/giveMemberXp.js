const generateXp = require("./generateXp");
const queryDB = require("./queryDB");

const giveMemberXp = async commandsDTO => {
  const message = commandsDTO.message;
  const selectXpQuery = `SELECT * FROM xp WHERE id = '${message.author.id}' and guildid = '${message.guild.id}'`;
  const newXpQuery = `INSERT INTO xp (id, xp, guildid) VALUES ('${message.author.id}', ${generateXp()},'${message.guild.id}')`;

  commandsDTO.queryString = selectXpQuery;
  const result = await queryDB(commandsDTO);

  if (!result.rows[0]) {
    commandsDTO.queryString = newXpQuery;
    queryDB(commandsDTO);
  } else {
    const xp = result.rows[0].xp;
    commandsDTO.queryString = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}' and guildid = '${
      message.guild.id
    }'`;
    queryDB(commandsDTO);
  }
};

module.exports = giveMemberXp;
