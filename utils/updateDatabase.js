var updateDatabase = async function(queue, message, databaseConnection) {
  var queueName = queue.name;
  return new Promise((resolve, reject) => {
    var stringify = JSON.stringify(queue);
    let query = `UPDATE queues SET queue = '${stringify}' WHERE userid = '${
      message.author.id
    }' and queuename = '${queueName}'`;
    resolve(databaseConnection.query(query));
    reject("Bad parameter");
  }); //end promise
};

module.exports = updateDatabase;
