//create server
const express = require("express");
const app = express();
const port = 9000;
// app.listen(port);
// console.log("http://localhost:" + port);
const path = require("path"); //The Path module provides a way of working with directories and file paths.

app.use(express.json()); //is a built in middleware function in Express. It parses incoming JSON requests and puts the parsed data in req.body

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
  //dirname() method returns the directories of a file path.
});

app.listen(port);
console.log("http://localhost:" + port);
