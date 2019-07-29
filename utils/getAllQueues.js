//Compare with get queue to make sure functional under new object model

var getAllQueues = async function(message, databaseConnection) {
  return new Promise(
    (resolve, reject) => {
      databaseConnection.query(
        `SELECT * FROM queues WHERE userid = '${message.author.id}'`,
        (err, result) => {
          if (err) reject(err);
          else {
            if (!result.rows[0]) {
              let queues = [];
              resolve(queues);
            } //end if
            else {
              let queues = [];
              let i = 0;
              result.rows.forEach(element => {
                queues[i] = result.rows[i].queuename;
                i++;
              });
              resolve(queues);
            } //end else
          } //end else
        } //end (err,result) =>
      ); //end con_datbase.query
    } //end function
  ); //end promise
};

module.exports = getAllQueues;
