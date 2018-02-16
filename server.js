var app = require('express')();
var http = require('http').Server(app);
var io = require("socket.io")(http);
// var port = process.env.PORT || 5000;

// app.set('port', (process.env.PORT || 5000));

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.get("/style/main.css", function (request, response) {
    response.sendFile(__dirname + "/style/main.css");
});

app.get("/js/initial.js", function (request, response) {
    response.sendFile(__dirname + "/js/initial.js");
});

app.get("/js/app.js", function (request, response) {
    response.sendFile(__dirname + "/js/app.js");
});

io.on('connection', function (socket) {
    var user = Date.now();

    //сюда приходит сообщение с клиента (socket.emit) c клиента
    socket.on('message.sent', function (message) {
        io.emit("chat", message);
    });

    //io.emit("message", "User " + user + " connected");
});

// app.listen(app.get('port'), function () {
//     console.log('Node app is running on port', app.get('port'));
// });

// http.createServer(onRequest).listen(process.env.PORT || 5000)


http.listen(3000, function () {
    console.log('Started server');
});