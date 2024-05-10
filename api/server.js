
const jsonServer = require('json-server')
const fs = require("fs")
const os = require("os")

const server = jsonServer.create()
const router = jsonServer.router(path.resolve(os.tmpdir() + "/db.json"));

// const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Copy the db.json file to the temporary directory (optional)
fs.copyFile('db.json', os.tmpdir() + '/db.json')
  .then(() => console.log('Copy file succeeded to', os.tmpdir()))
  .catch(err => console.error('Error copying file:', err));


server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
}))
server.use(router)


server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server