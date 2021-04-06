const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const JWTCONFIG = require("./configs/jwt.config");
const cors = require('cors')
const path = require('path')
const history = require("connect-history-api-fallback")
const authrouter = require('./router')
const {db, sequelize, jwt} = require('./initRequire')

const host = 'localhost'

app.use(cors())
app.use(express.json())
app.use('/auth', authrouter)
app.use(history())
app.use(express.static('dist'))
app.use(express.static(path.join(
  __dirname, 'serverPublic'
)))

io.use(function(socket, next) {
  if (socket.handshake.query && socket.handshake.query.token != 'null') {
    jwt.verify(socket.handshake.query.token, JWTCONFIG.SECRET, function(
      err,
      decoded
    ) {
      if (err) {
        console.log('Authentication error');
        return next(new Error("Authentication error"));
      }
      socket.decoded_token = decoded;
      next();
    });
  } else {
    console.log('token is null');
    next(new Error("Authentication not success"));
  }
});


io.on('connection', async socket => {
  console.log('SocketIO')
  socket.decoded_token = await jwt.decode(socket.handshake.query.token);
  console.log(socket.decoded_token);
  socket.emit('con')
  // Сокет авторизован, можем обрабатывать события от него
})

module.exports = {
  db,
  sequelize,
  express,
  app,
  server,
  host
}
