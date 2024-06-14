require('dotenv').config()

const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS
}

module.exports = redisConfig