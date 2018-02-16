var app = require('express')();
var http = require('http').Server(app);
var io = require("socket.io")(http);

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

http.listen(3000, function () {
    console.log('Started server');
});



//передаем данные на сервер
// let message = {
//     player1: "hello"
// }
// if (socket.readyState === WebSocket.OPEN) {
//     socket.send(JSON.stringify(message));
// }

// //открытие сокет-соединения
// socket.onopen = function (event) {
//     status.innerHTML = "Соединение установлено!";
// }
// //Закрытие сокет-соединения
// socket.onclose = function (event) {
//     if (event.wasClean) {
//         status.innerHTML = "Соединение успешно закрыто!";
//     } else {
//         status.innerHTML = "Ошибка соединения! Внезапное закрытие.";
//     };
//     status.innerHTML += "<br>код: " + event.code + "причина " + event.reason;
// }
// //получение данных
// socket.onmessage = function (event) {
//     let message = JSON.parse(event.data);
//     status.innerHTML = "Пришли данные: " + message.player1;
// }
// //возникновение ошибки
// socket.onerror = function (event) {
//     status.innerHTML = "Ошибка:" + event.error;
// }