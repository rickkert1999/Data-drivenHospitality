//express npm
const { response } = require("express");
const express = require("express");
const app = express();
const fs = require("fs");

//socket.io npm
const http = require("http").Server(app);
const io = require("socket.io")(http);
const serverPort = 3000;

app.use(express.static("public")); //set the public folder to static
app.get("/", function (req, res) {
  res.sendFile("public", { root: __dirname }); //your html file path
});
app.use(express.json());
app.post("/reservation", function (req, res) {
  console.log(req.body);

  // convert JSON object to string
  const data = JSON.stringify(req.body);

  // write JSON string to a file
  fs.writeFile("public/json/user.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
});

//Whenever someone connects this gets executed
io.on("connection", function (socket) {
  console.log("A user connected");

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

//declare the port
http.listen(3000, function () {
  console.log("listening on *:" + serverPort);
  console.log("listening on: http://localhost:" + serverPort);
});

//instal npm's: socket.io, express
