const { Client } = require("pg"); //PostgreSQL database

const connectToDatabase = commandsDTO => {
  //PostgreSQL Connection:
  commandsDTO.databaseConnection = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  commandsDTO.databaseConnection.connect(err => {
    if (err) console.log(err);
    console.log("Connected to database.");
  });
};

module.exports = connectToDatabase;
