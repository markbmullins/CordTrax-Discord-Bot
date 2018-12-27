var deleteQueue = async function (queueName, message, con_database){
    return new Promise((resolve, reject) => {
        //Updating database
        let query = `DELETE FROM queues WHERE queuename = '${queueName}' AND userid = '${message.author.id}'`;
        resolve(con_database.query(query));
        reject("Bad parameter");
    });//end promise
};

module.exports = deleteQueue;