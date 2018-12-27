var insertNewInDatabase = async function (queue, message, con_database){
    queueName = queue.name;
    return new Promise(
        function(resolve, reject){
            var stringify = JSON.stringify (queue);
            let query = `INSERT INTO queues (userid, queueName, queue) VALUES ('${message.author.id}', '${queueName}', '${stringify}')`;
            resolve(con_database.query(query));
        }//end function
    );//end Promise
};

module.exports = insertNewInDatabase;