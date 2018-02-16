var http = require("http");
var fs = require("fs");
var socketio = require('socket.io');
var html = require("escape-html");

var server = http.createServer();
var io = socketio(server);
var port = 3000;


fs.readFile("./index.html", function (err, html) {
  if (err) {
    throw err;
  }

  io.on("connection", function (socket) {
    socket.on("message", function (data) {
      socket.broadcast.emit('message', data);
    })
  })

  server.on('request', function (request, response) {

    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(html);
    response.end();

  })

  server.listen(port, function () {
    console.log("Server running at port " + port);
  })
})
