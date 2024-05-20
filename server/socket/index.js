const socketIo = require('socket.io');
const { verifyJWT } = require('../middleware/auth');
const jwt= require("jsonwebtoken")
const initializeSocket = (serverr) => {
  const io = socketIo(serverr, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });


  io.use((socket, next)=> {
    const token=  socket.handshake.query.toke;
    if(!token){
        return next(new Error("Authentication error"));
    }
    jwt.verify(token, "secret", (err, payload)=> {
        if(err){
            return next(new Error("Authentication error"));
        }
        socket.user= payload ;
        next()
    })
})
  io.on('connection', (socket) => {
    // console.log('A user connected', socket.user);
    socket.on('message', (msg) => {
      io.emit('message', { user: socket.user.username, text: msg });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

module.exports = initializeSocket;
