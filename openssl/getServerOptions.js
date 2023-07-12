const path = require('path')
const fs = require('fs')

const getServerOptions = () => {
    const key =  fs.readFileSync(path.join(__dirname, 'server.key'))
    const cert = fs.readFileSync(path.join(__dirname, 'server.crt'))

    return {
        key,
        cert        
    }

}

module.exports = getServerOptions