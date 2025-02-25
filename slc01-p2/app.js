const express = require('express')
const Controller = require('./controllers')
const errorHandler = require('./middlewares/errorHandler')
const authentication = require('./middlewares/authentication')
const authorization = require('./middlewares/authorization')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/register', Controller.register)
app.post('/login', Controller.login)

app.use(authentication)

app.get('/groceries', Controller.read)
app.post('/groceries', Controller.create)

app.put('/groceries/:id', authorization, Controller.update)
app.delete('/groceries/:id', authorization, Controller.delete)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})