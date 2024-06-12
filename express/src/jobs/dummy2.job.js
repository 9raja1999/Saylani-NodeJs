const cron = require('node-cron')

const dummyJob2 = cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
});

module.exports = dummyJob2