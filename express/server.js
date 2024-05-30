const express = require('express')
const cors = require('cors')
const { config } = require('./src/configs/server.config')
const { corsConfig } = require('./src/configs/cors.config')


const PORT = config.appPort
const app = express()

app.use(cors(corsConfig))

app.get('/', (req, res) => {
    return res.send('Hello world!')
})
app.get('/products', (req, res) => {
    return res.send(['i', 'a'])
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})