const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const test = require('./sockets/testapi.js')
const conSeq = require("./conSeq.js")

const sequelize = conSeq()
const users = require('./models/users.js')

const User = sequelize.define('users', users)

const db = {
  User
}

io.on('connection', socket => {
  test()
  console.log('SocketIO')

})

module.exports = {
  db,
  sequelize,
  app,
  server
}
