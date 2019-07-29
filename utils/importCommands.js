const fs = require("fs"); //includes the file system package

const importCommands = client => {
  //Command Handler:
  fs.readdir("../commands/", (err, files) => {
    //if error,
    if (err) console.log(err);

    //if no error,
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
      console.log("Couldn't find commands.");
      return;
    }

    //loading each .js file
    jsfile.forEach((f, i) => {
      let props = require(`../commands/${f}`);
      console.log(`${f} loaded.`);
      client.commands.set(props.help.name, props); //The set() method adds or updates an element with a specified key and value to a Map object.
    });
  });
};

module.exports = importCommands;
