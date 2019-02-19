const users = require('../models/users')
let id = 1

module.exports = {
    login: (req, res, next) => {
        const { session } = req
        const { username, password } = req.body
        const user = users.find(user => user.username === username && user.password === password)

        if(user){
            session.user.username = username
            res.send(200).send(session.user)
        } else {
            res.send(500).send('unauthorized')
        }

    },
    register: (req, res, next) => {
        const {session} = req
        const { username, password } = req.body
        users.push({id, username, password})
        id++

        session.user.username = username
        res.status(200).send(session.user)

    },
    signout: (req, res, next) => {
        const {session} = req
        session.destroy()
        res.status(200).send(session)

    },
    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
    }
}