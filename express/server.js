const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { config } = require('./src/configs/server.config')
const { corsConfig } = require('./src/configs/cors.config')
const { route: userRoute } = require('./src/routes/user.routes')
const { route: todoRoute } = require('./src/routes/todo.routes')


const PORT = config.appPort
const app = express()

    ; (async () => {
        try {
            await mongoose.connect(config.dbUri)
            console.log("DB CONNECTED");

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

