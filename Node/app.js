const http = require('http')
const queryString = require('node:querystring')
const fs = require('fs')
const path = require('path')

const PORT = 3001
const filePath = path.join(process.cwd(), 'data.json')


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Home Route')
        res.end()
        return
    }
    if (req.url === '/login') {
        res.setHeader('Content-Type', 'text/html')
        res.write(`<h1>Login User</h1>
        <form action='/submitLogin' method="POST">
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="text" name="password" placeholder="Enter Password" />
        <button>SUBMIT</button>
        </form>`)
        res.end()
        return
    }
    if (req.url === '/signup') {
        res.setHeader('Content-Type', 'text/html')
        res.write(`<h1>Register User</h1>
        <form action='/submitRegister' method="POST">
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="text" name="password" placeholder="Enter Password" />
        <button>SUBMIT</button>
        </form>`)
        res.end()
        return
    }

    if (req.url === '/submitRegister') {
        let data = ""
        req.on('data', (chunk) => {
            data += chunk
        })

        req.on('end', () => {
            const parsedData = queryString.parse(data)

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log("Error reding file", err);
                } else {
                    let database = JSON.parse(data)
                    database.users.push(parsedData)
                    console.log("DB", database);
                    fs.writeFile(filePath, JSON.stringify(database), (err) => {
                        if(err) {
                            console.log("Error registering user")
                        }
                        res.write('success')
                        res.end()
                    })
                }
            })
        })
        return
    }

    if (req.url === '/submitLogin') {
        let data = ""
        req.on('data', (chunk) => {
            data += chunk
        })

        req.on('end', () => {
            const parsedData = queryString.parse(data)
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log("Error reding file", err);
                } else {
                    let { users } = JSON.parse(data)
                    const find = users.find(user => user.username === parsedData.username && user.password === parsedData.password)
                    if (find) {
                        res.write('Success')
                        res.end()
                    } else {
                        res.write('Invalid credentials')
                        res.end()
                    }
                }
            })
        })
        return
    }


    res.write('Invalid Route')
    res.end()
})

server.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})