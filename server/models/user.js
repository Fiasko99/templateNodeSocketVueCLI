const Sequelize = require("sequelize");

const user = {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
  username: {
      type: Sequelize.STRING,
      allowNull: true
  },
  userlogin: {
      type: Sequelize.STRING,
      allowNull: true
  },
  userpass: {
      type: Sequelize.STRING,
      allowNull: true
  },
  useravatar: {
      type: Sequelize.STRING,
      allowNull: true
  },
}

module.exports = user
