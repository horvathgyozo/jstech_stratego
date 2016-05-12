var express = require('express');
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

function randomString() {
  return Date.now().toString();
}

var numberOfPlayersInActiveRoom = 0;
var actGame = randomString();

io.on('connection', function (socket) {
  console.log(socket.id);
  socket.on('join', function () {
    console.log('joined', socket.id);
    var gameId = actGame;
    var playerId = randomString();
    socket.join(gameId);
    socket.emit('joined', {
      gameId,
      playerId,
      color: numberOfPlayersInActiveRoom === 0 ? 'red' : 'blue',
    });
    
    numberOfPlayersInActiveRoom++;
    if (numberOfPlayersInActiveRoom === 2) {
      io.to(gameId).emit('startGame');
      actGame = randomString();
      numberOfPlayersInActiveRoom = 0;
    }
  });
});

server.listen(3000);
