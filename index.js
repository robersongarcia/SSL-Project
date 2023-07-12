const https = require('https');
const serverOptions = require('./openssl/getServerOptions');

const options = serverOptions()

const PORT = 3000

const server = https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Hello HTTPS')
});

server.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
})

