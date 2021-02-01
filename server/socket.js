const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", 'http://localhost:8080')
  res.set("Access-Control-Allow-Headers", 'Content-type')
  res.set("Access-Control-Allow-Methods", 'GET, POST')
  res.set("Access-Control-Allow-Credentials", true)
  res.removeHeader('X-Powered-By')
  next()
})



io.on('connection', socket => {

  console.log('SocketIO')

})

module.exports = {
  app,
  server
}
