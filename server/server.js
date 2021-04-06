const { db, sequelize, express, app, server, host } = require('./socket')

app.get('/', (req, res) => {
  res.send('It work')
  res.sendFile(
    path.join(__dirname, '../dist', 'index.html')
  )
})

app.get('/users', (req, res) => {
  res.send('users')
})

const start = async function() {
  const port = 3000
  server.listen(port, async () => {
    await sequelize.sync({ alter: true })
    console.info(`[server] connection DB `);
    console.info(`Server listening on http://${host}:${port}`,)
    console.log(`_`.repeat(48))
  })
}
start() 
