//create server
const express = require("express");
const app = express();
const port = 9000;
// app.listen(port);
// console.log("http://localhost:" + port);

app.use(express.json()); //is a built in middleware function in Express. It parses incoming JSON requests and puts the parsed data in req.body

app.listen(port);
console.log("http://localhost:" + port);
