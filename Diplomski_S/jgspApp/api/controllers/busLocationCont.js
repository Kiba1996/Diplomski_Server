var io = require('socket.io')(server);

io.on('connection',
  (socket) => {
    setInterval(() => {
        var value = Math.floor(Math.random() * 50);
        socket.emit('data', { data: value });
      },
      2000);
  });