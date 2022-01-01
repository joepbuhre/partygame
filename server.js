const path = require('path');
const express = require('express');
const app = express();
const http = require('http')


const static = require('node-static');
const distFolder = new static.Server('./dist');

const port = 3000

const server = http.createServer(function (req, res) {
  distFolder.serve(req, res);
}).listen(port, () => {
  console.log('Server listening on: http://localhost:%s', port)
})



const io = require('socket.io')(server, {
  cors: {
    origins: ['*']
  }
});

const sockets = {}

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete sockets[socket.id]
  });

  socket.on('disconnecting', () => {
    socket.broadcast.emit('user_logout', socket.id)
  })

  socket.on('login', (data) => {
    console.log(data);
    const response = {
      id: socket.id,
      data: data
    }
    sockets[socket.id] = response
    io.emit('user_login', sockets)
  });

  socket.on('ws_config', (msg) => {
    socket.broadcast.emit('ws_config', msg)
  });

  socket.on('test', (data) => {
    console.log(`const sockets = ${JSON.stringify(sockets)}`)
  })

});