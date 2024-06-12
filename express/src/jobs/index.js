const dummyJob = require("./dummy.job.js")
const dummyJob2 = require("./dummy2.job.js")

const cronManager = new Map()

cronManager.set('dummyJob1', dummyJob)
cronManager.set('dummyJob2', dummyJob2)

module.exports = cronManager
