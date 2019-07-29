var deleteQueue = async function(queueName, message, databaseConnection) {
  return new Promise((resolve, reject) => {
    //Updating database
    let query = `DELETE FROM queues WHERE queuename = '${queueName}' AND userid = '${
      message.author.id
    }'`;
    resolve(databaseConnection.query(query));
    reject("Bad parameter");
  }); //end promise
};

module.exports = deleteQueue;
