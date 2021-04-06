const JWTCONFIG = require("./configs/jwt.config");
const bcrypt = require('bcryptjs')
const {db, jwt} = require('./initRequire')
const {validationResult} = require('express-validator')

const generateAccessToken = (id, username, roles) => {
  const payload = {
    id,
    username,
    roles
  }
  return jwt.sign(payload, JWTCONFIG.SECRET, {expiresIn: "24h"})
}

class authController {
  async registration(req, res) {
    try {
      const {userlogin, userpass} = req.body
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Ошибка при регистрации", errors})
      }

      const candidate = await User.findOne({userlogin})
      if (candidate) {
        return res.status(400).json({message: "Пользователь существует"})
      }
      const hashPassword = bcrypt.hashSync(userpass, 8)
      await db.User.create({userlogin: userlogin, userpass: hashPassword})
      return res.json({message: "Пользователь успешно создан"})
    } catch (error) {
      console.log(error);
      res.status(400).json({message: "registration error"})
    }
  }

  async login(req, res) {
    try {
      const {userlogin, userpass} = req.body
      const user = await db.User.findOne({
        where: {
          userlogin: userlogin
        }
      })
      if (!user) {
        return res.status(400).json({message: "Пользователь не существует"})
      }
      const validPassword = bcrypt.compareSync(userpass, user.userpass)
      if (!validPassword) {
        return res.status(400).json({message: "Неверный пароль"})
      }
      const token = generateAccessToken(
        user.id, user.username, user.roles
      )
      return res.json({token})
    } catch (error) {
      console.log(error);
      res.status(400).json({message: "login error"})
    }
  }

  async getUsers(req, res) {
    try {
      const users = await db.User.findAll()
      res.json(users)
    } catch (error) {
      console.log(error);
      res.status(400).json({message: "operation error"})
    }
  }
}

module.exports = new authController()