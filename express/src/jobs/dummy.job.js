const cron = require('node-cron')

const dummyJob = cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
});

module.exports = dummyJob 