//create server
const express = require("express");
const app = express();
const port = 9000;
// app.listen(port);
// console.log("http://localhost:" + port);
const path = require("path"); //The Path module provides a way of working with directories and file paths.

app.use(express.json()); //is a built in middleware function in Express. It parses incoming JSON requests and puts the parsed data in req.body
app.use("/styles.css", express.static(`${__dirname}/../frontend/styles.css`)); // Static means pre-rendered web pages that do not change on time. Dynamic means it is generated in real-time at the time of the request by the server.//static files da veränder sich der content nicht, daher "nur" das css als static hier
app.use("/script.js", express.static(`${__dirname}/../frontend/script.js`));

//Asynchronous code to reading file from json

const fs = require("fs");

app.get("/api/data", (req, res) => {
  fs.readFile("./backend/simpsons.json", "utf-8", (err, data) => {
    try {
      const simpsons = JSON.parse(data);
      res.send(simpsons);
    } catch (err) {
      console.log(err);
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
  //dirname() method returns the directories of a file path.
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
  //dirname() method returns the directories of a file path.
});

app.get("/choose-your-character", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/chooseYourCharacter.html`));
});

app.get("/built-your-character", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/chooseYourCharacter.html`));
});

app.get("/your-characters", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/yourCharacters.html`));
});

app.listen(port);
console.log("http://localhost:" + port);
