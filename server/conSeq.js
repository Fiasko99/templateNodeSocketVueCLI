const Sequelize = require('sequelize')
const DBCONFIG = require("./config/db.config");

module.exports = function() {
  return new Sequelize(DBCONFIG.DB, DBCONFIG.USER, DBCONFIG.PASSWORD, {
    dialect: DBCONFIG.dialect,
    host: DBCONFIG.HOST,
    logging: false
  });
}