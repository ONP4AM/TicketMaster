const cors_anywhere = require('cors-anywhere');

const host = '0.0.0.0'; // Set to the desired host
const port = 8080; // Set to the desired port

const server = cors_anywhere.createServer({
  originWhitelist: [], // Allow all origins (not recommended for production)
});

server.listen(port, host, () => {
  console.log(`CORS Anywhere server is running on ${host}:${port}`);
});
