const express = require('express')
require('dotenv').config()
const { json } = require('body-parser')
const session = require('express-session')
const checkForSessions = require('./middlewares/checkForSessions')
const app = express()
const sc = require('./controllers/swag_controller')
const ac = require('./controllers/auth_controller')
const cc = require(`./controllers/cart_controller`)
const searchController = require(`./controllers/search_controller`)


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(json())


app.use(checkForSessions)
app.get(`/api/swag`, sc.read)
app.post(`/api/login`, ac.login)
app.post(`/api/register`, ac.register)
app.post(`/api/signout`, ac.signout)
app.get(`/api/user`, ac.getUser)
app.post(`/api/cart`, cc.add)
app.post(`/api/cart/checkout`, cc.checkout)
app.delete(`/api/cart`, cc.delete)
app.get(`/api/search`, searchController.search)


const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => console.log(`we good on ${PORT}`))