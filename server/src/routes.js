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
router.post('/createNote', auth, users.createNote)
router.get('/getNotes', auth, users.getNotes)
router.patch('/updateNote/:note_id', auth, users.updateNote)
router.patch('/deleteNote/:note_id', auth, users.updateNote)

module.exports = router