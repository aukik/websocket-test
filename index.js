const express = require('express');
const { createServer } = require('http'); // Changed from 'node:http'
const { join } = require('path'); // Changed from 'node:path'
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected',"\nsocket id: ",socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected',"\nsocket id: ",socket.id);
  });

  socket.on('chatmessage', (msg) => {
    msg.socket_id=socket.id
    console.log(msg);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
