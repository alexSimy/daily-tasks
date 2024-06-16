const http = require('http');

const createExpressApp = require('./app');

require('dotenv').config();
const SERVER_PORT: string | number = process.env.SERVER_PORT || 3002;

// start server
async function startServer() {
  const app = await createExpressApp();
  const server = http.createServer(app);

  server.listen(SERVER_PORT, () => {
    console.log(`Server started on port ${SERVER_PORT}`);
  });

  server.on('error', onError);

  // Graceful shutdown
  process.on('SIGTERM', function () {
    server.close(function (err: Error) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      process.exit(0);
    });
  });
}

startServer();

// Shutdown handlers
var exitHandler = function (options?: { signal?: string }) {
  if (options === void 0) {
    options = {};
  }
  if (options.signal) process.kill(process.pid, options.signal);
};
process.on('SIGINT', function () {
  console.log('Process stopped with Ctrl + c.');
  return exitHandler({ signal: 'SIGINT' });
});
process.on('SIGHUP', function () {
  return exitHandler({ signal: 'SIGHUP' });
});
process.on('SIGQUIT', function () {
  return exitHandler({ signal: 'SIGQUIT' });
});
process.on('SIGTERM', function () {
  return exitHandler({ signal: 'SIGTERM' });
});
process.on('SIGUSR1', function () {
  return exitHandler({ signal: 'SIGUSR1' });
});
process.on('SIGUSR2', function () {
  return exitHandler({ signal: 'SIGUSR2' });
});
process.on('uncaughtException', function (error) {
  console.error(error);
  process.exit(1);
});
process.on('exit', function () {
  return exitHandler();
});

/** Event listener for HTTP server "error" event. */
function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind =
    typeof SERVER_PORT === 'string'
      ? 'Pipe '.concat(`${SERVER_PORT}`)
      : 'Port '.concat(`${SERVER_PORT}`);
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(''.concat(bind, ' requires elevated privileges'));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(''.concat(bind, ' is already in use'));
      process.exit(1);
      break;
    default:
      throw error;
  }
}
