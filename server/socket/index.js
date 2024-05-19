const socketIo = require('socket.io');
const { verifyJWT } = require('../middleware/auth');

const initializeSocket = (serverr) => {
  const io = socketIo(serverr, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

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
      console.log(msg);
      io.emit('message', { user: socket.user.username, text: msg });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

module.exports = initializeSocket;
