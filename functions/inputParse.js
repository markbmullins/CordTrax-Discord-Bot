//Need to update requires

var inputParse = async function (message,args,prefix,helpMessage){ //Returns queueName and URL
    var url = false;
    var title=false;
    var queue = false;
    var message = false;
    var regex = /^(https:\/\/)?(www.)?youtube.com\//;
    var defaultQueue = "defaultQueue";
    if(args[1]){
        //if !add <"song">
        if(args[0].startsWith("\"")){
            //Parsing input
            queue = defaultQueue;
            args[0] = args[0].replace("\"",""); //removes first "
            tempArgs = args.slice(1);
            let index=0;
            let strPosition;
            await tempArgs.forEach((element)=>{
                index+=1;
                if(element.indexOf("\"") != -1) strPosition = element.indexOf("\"");
            });
            tempArgs[index-1] = tempArgs[index-1].replace("\"","");
            title = args[0] + " " + tempArgs.join(" ");
        }//end else if(args[0].startsWith("\"")
        //Catching single quotes error
        else if(args[1].startsWith("\'")){
            message = "Please use double quotes (\"song name\") instead of single quotes.";
        }//end if(args[1].substring(0,1)
        //if !add <queue> <song>
        else if(args[1].startsWith("\"")){
            //Parsing input
            queue = args[0];
            args[1] = args[1].replace("\"",""); //removes first "
            if(args[1].endsWith("\"")){
                args[1] = args[1].slice(0, -1); //removes last "
                title = args[1];
            }//end if	
            else{
                tempArgs = args.slice(2);
                let index=0;
                let strPosition;
                await tempArgs.forEach((element)=>{
                    index+=1;
                    if(element.indexOf("\"") != -1) strPosition = element.indexOf("\"");
                });
                tempArgs[index-1] = tempArgs[index-1].replace("\"","");
                title = args[1] + " " + tempArgs.join(" ");
            }//end else
        }//end else if(args[1].substring(0,1) === "\"")
        //if !add <queue> <URL>
        else if(regex.test(args[1])){
            queue = args[0];
            url = args[1];
        }
        else{
            message = `Something went wrong. Try ${prefix}add help for help.`;
        }//end else
    }//end if(args[1])
    else{
        //!add case
        if(!args[0]){
            message = "Please provide a song to add to the queue.";
        }//end if
        //!add help case
        else if(args[0]==="help"){
            message = helpMessage;
        }//end else if
        //Catching single quotes error
        else if(args[0].startsWith("\'")){
            message = "Please use double quotes (\"song name\") instead of single quotes.";
        }//end else if
        //if !add <"song"> and song is one word
        else if(args[0].startsWith("\"")){
            //Parsing input
            queue = defaultQueue;
            args[0] = args[0].replace("\"",""); //removes first "
            if(args[0].endsWith("\"")) args[0] = args[0].slice(0, -1); //removes last "
            title = args[0];
        }//end else if(args[0].startsWith("\"")

        //if !add <URL>
        else if(regex.test(args[0]) && !args[1]){
            url = args[0];
            queue = defaultQueue;
        }//end if(args[0].search(regex) && !args[1])

        else{
            message = `Something went wrong. Try ${prefix}add help for help.`;
        }//end else
    }//end else

    if(title){
        //Getting URL
        url = await queueFunctions.getURL(message, song);
    }
    else if (url && !title){
        title = await queueFunctions.getTitle(url);
    }
    var inputArray = [queue, url, title, message];
    return inputArray;
}

module.exports = inputParse;