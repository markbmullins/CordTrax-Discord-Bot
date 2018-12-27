var getQueue = async function (queueName, message, con_database){
    return new Promise(
        (resolve, reject) => {
            con_database.query(`SELECT * FROM queues WHERE userid = '${message.author.id}' and queuename = '${queueName}'`, 
                (err, result) =>{
                    if(err) reject(err);
                    else{
                        //console.log("Result: ", result);
                        if(!result.rows[0]){
                            var flag = false;
                            resolve(flag);
                        }//end if
                        else{
                            var queue = result.rows[0].queue;
                            //Last semicolon results in empty element of array at the end
                            resolve(this.parseToQueue(queue));
                        }//end else
                    }//end else
                }//end (err,result) =>
            );//end con_datbase.query
        }//end function
    );//end promise
};

module.exports = getQueue;