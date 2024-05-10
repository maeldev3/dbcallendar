
const jsonServer = require('json-server')
var fs = require("fs");
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()



 exports.handler = async function (event, context) {
  try {
    await fs.writeFile('/tmp/test.txt', 'testing'); // Use promises for async handling
    context.succeed('writeFile succeeded');
  } catch (error) {
    console.error('writeFile failed:', error); // Log errors for debugging
    context.fail('writeFile failed: ' + error.message); // Return detailed error message
  }
};


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