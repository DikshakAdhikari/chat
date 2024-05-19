const socketIo = require('socket.io');
const { verifyJWT } = require('../middleware/auth');
const config= require('../config/config')

const initializeSocket = (serverr) => {
  const io = socketIo(serverr, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  console.log(config.globalArray.push(2));

  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.toke) {
      verifyJWT(socket.handshake.query.toke, (err, decoded) => {
        if (err) return next(new Error('Authentication error'));
        socket.user = decoded;
        next();
      });
    } else {
      next(new Error('Authentication error'));
    }
  }).on('connection', (socket) => {
    console.log('A user connected', socket.user);

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
