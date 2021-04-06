const Router = require('express')
const router = new Router()
const controller = require('./controller')
const db = require('./controller')
const {check} = require('express-validator')
const sequelize = require('./controller')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration', [
  check('username', "Имя пользователя не может быть пустым")
  .notEmpty(),
  check('password', "Пароль должен быть длиннее 4 и больше 10 символов")
  .isLength(
    {min:4, max:10}
  )
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['admin']), controller.getUsers)

module.exports = router, db, sequelize