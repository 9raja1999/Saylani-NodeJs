const whiteList = ['http://localhost:3001' , 'http://localhost:3008']
const corsConfig = {
    origin : function(origin, callback) {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }else{
            callback(new Error('cors error'))
        }
    }
}

module.exports = {
    corsConfig
}