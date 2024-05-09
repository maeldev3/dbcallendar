
const jsonServer = require('json-server')

const server = jsonServer.create()


const router = jsonServer.router('db.json')

const missionsData = JSON.parse(fs.readFileSync(join('/tmp', 'db.json'), 'utf8')); 





const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
}))
server.use(router)


server.get('/missions', (req, res) => {
   res.json(missionsData);
});

server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server