
const jsonServer = require('json-server')
var fs = require("fs");
const server = jsonServer.create()
// const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()



// Replace with the URL of your separate server hosting db.json
const dbUrl = 'https://dbcallendar.vercel.app/';

async function getDbData() {
  const response = await fetch(dbUrl);
  const data = await response.json();
  return data;
}

const router = jsonServer.router(getDbData); 



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