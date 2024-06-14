# DOCKER REDIS STEPS
1. docker pull redis
2. docker run -p 8000:6379 --name redis -d redis redis-server --appendonly yes --requirepass 123456\


# Bull UI BOARD REPO LINK:

npm i @bull-board/ui
https://github.com/felixmosh/bull-board/blob/master/examples/with-express/index.js


# Bull Package Link:

npm i bull
https://www.npmjs.com/package/bull


# REDIS CONFIG

host : 127.0.0.1
port : 6379 (this wil be local machine port on which you have binded the conttrainer port)
pass : ********