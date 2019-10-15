const { Client } = require("pg"); //PostgreSQL database

const connectToDatabase = commandsDTO => {
  const log = commandsDTO.log;
  //PostgreSQL Connection:
  commandsDTO.databaseConnection = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  commandsDTO.databaseConnection.connect(err => {
    if (err) console.log(err);
    log.info("Bot connected to database.");
  });
};

module.exports = connectToDatabase;
