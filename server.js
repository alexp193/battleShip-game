var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connectSocket = require("./app/serverComunication")
connectSocket(io);

var port = 3000;


app.use(express.static(__dirname + '/public'));

app.post('/', function (req, res) {
  var user_name = req.body.user;
  console.log(user_name);
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});