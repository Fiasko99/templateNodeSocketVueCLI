const { db, sequelize, app, server } = require('./socket')
const test = require('./apis/testapi.js')

(async function () {
  let newUser = await db.User.create(
    { username: "Jane" }
  )
  console.log(newUser.dataValues);
}())

app.get('/', (req, res) => {
  test()
  res.end('It works')
})

async function start() {
  const host = 'localhost'
  const port = 3000

  server.listen(port, async () => {
    await sequelize.sync({ alter: true })
    console.log(`[server] connection DB `);
    console.log(`Server listening on http://${host}:${port}`,)
    console.log(`_`.repeat(48))
  })
}
start()
