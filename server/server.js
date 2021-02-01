const { app, server } = require('./socket')



app.get('/', (req, res) => {
  res.end('It works')
})

async function start() {
  const host = 'localhost'
  const port = 3000

  server.listen(port, () => {
    console.log(`Server listening on http://${host}:${port}`,)
  })
}
start()
