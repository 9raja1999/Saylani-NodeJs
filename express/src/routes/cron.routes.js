const express = require('express')
const { startJob, stopJob } = require('../controllers/cron.controller.js')
const { checkAuth } = require('../middlewares/check-auth.middleware.js')


const route = express.Router()


route.post('/start-job', startJob)
route.post('/stop-job', stopJob)



module.exports = { route }