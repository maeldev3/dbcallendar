
const jsonServer = require('json-server')

const server = jsonServer.create()


const router = jsonServer.router('db.json')



const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
// Add a check to ensure 'db.json' file exists and is writable
try {
    // Check if the file exists
    fs.accessSync('db.json', fs.constants.R_OK | fs.constants.W_OK);
} catch (err) {
    // If the file does not exist or is not writable, handle the error
    console.error('Error accessing or writing to db.json file:', err);
    process.exit(1); // Exit the process with an error code
}



server.use(jsonServer.rewriter({
    '/api/*': '/$1',
}))
server.use(router)


server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server