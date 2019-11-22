const express = require('express')
const users = require('./controllers/users')
const auth = require('./middleware/auth.js')

const router = express.Router()

router.get('/login', users.login)
router.get('/logout', auth, users.logout)
router.post('/users', users.createUser)
router.patch('/users/:id', auth, users.updateUser)
router.delete('/users/:id', users.deleteUser)
router.get('/users/:id', users.getUser)

module.exports = router