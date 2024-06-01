require('dotenv').config()

const config = {
    appPort: process.env.SERVER_APP_PORT,
    dbUri: process.env.MONGO_URI,
    secretKey: process.env.SECRET_KEY
}

module.exports = {
    config
}