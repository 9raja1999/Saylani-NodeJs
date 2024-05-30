require('dotenv').config()

const config = {
    appPort: process.env.SERVER_APP_PORT,
}

module.exports = {
    config
}