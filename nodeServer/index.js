const {createServer} = require('http');
const {Server} = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5500","http://localhost:5500"],
    credentials: true
  }
});

httpServer.listen(8000);

const users = {}


io.on('connection', socket =>{
    socket.on('new-user-joined', Name=>{
        users[socket.id] = Name;
        socket.broadcast.emit('user-joined', Name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, Name: users[socket.id]})
    });

    socket.on('disconnect', message=>{
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id];
    });

})