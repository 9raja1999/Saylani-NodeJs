const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { config } = require('./src/configs/server.config')
const { corsConfig } = require('./src/configs/cors.config')
const { route: userRoute } = require('./src/routes/user.routes')
const { route: todoRoute } = require('./src/routes/todo.routes')
const { DB_RETRY_LIMIT, DB_RETRY_TIMEOUT } = require('./src/constants/constants')

let connnectionRetries = 0
async function connectToDB() {
    try {
        console.log("Establishing DB connection....")
        await mongoose.connect(config.dbUri)
        console.log("DB connected")
    } catch (error) {
        if (connnectionRetries < DB_RETRY_LIMIT) {
            connnectionRetries++
            // setTimeout(async() => {

            // } , DB_RETRY_TIMEOUT)
            console.log(`Reconnecting to DB ${connnectionRetries}/${DB_RETRY_LIMIT}`)
            await new Promise(resolve => setTimeout(resolve, DB_RETRY_TIMEOUT))
            await connectToDB()
        } else {
            process.exit()
        }
    }
}

const PORT = config.appPort
const app = express()

    ; (async () => {
        try {

            await connectToDB()

            app.use(cors(corsConfig))
            app.use(express.json()) // to accept json in body


            app.use('/user', userRoute)
            app.use('/todo', todoRoute)



            app.get('*', (req, res) => {
                return res.send('Invalid route')
            })

            app.listen(PORT, () => {
                console.log(`Server listening on port ${PORT}`);
            })
        } catch (error) {
            console.error('Error', error)
        }
    })()

