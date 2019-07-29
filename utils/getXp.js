//Check syntax to make sure this function is valid
var queryXp = async function(userId) {
  var xp;
  databaseConnection.query(
    `SELECT * FROM xp WHERE id ='${userId}' and guildid = '${message.guild.id}'`,
    (err, result) => {
      if (err) throw err;
      if (!result.rows[0]) xp = 0;
      xp = result.rows[0].xp;
    }
  );
  return xp;
};

module.exports = queryXp;
