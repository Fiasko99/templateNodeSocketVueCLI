const jwt = require('jsonwebtoken')

const conSeq = require("./conSeq.js")

const sequelize = conSeq()
const users = require('./models/users.js')

const User = sequelize.define('users', users)

const db = {
  User
}

module.exports = {
  sequelize,
  db,
  jwt
}