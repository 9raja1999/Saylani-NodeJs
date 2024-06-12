const cronManager = require("../jobs")

const startJob = async (req, res) => {
    try {
        const { jobName } = req.body

        const job = cronManager.get(jobName)
        if (!job) {
            return res.status(404).json({ success: false, message: `job not fount with name ${jobName}`, data: null })
        }


        job.start()
        return res.status(200).json({ success: true, message: 'success', data: null })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something went wrong', data: null })
    }
}
const stopJob = async (req, res) => {
    try {
        const { jobName } = req.body

        const job = cronManager.get(jobName)
        if (!job) {
            return res.status(404).json({ success: false, message: `job not fount with name ${jobName}`, data: null })
        }


        job.stop()
        return res.status(200).json({ success: true, message: 'success', data: null })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something went wrong', data: null })
    }
}

module.exports = {
    startJob,
    stopJob
}