const express = require('express')
const users = require('./controllers/users')
const notes = require('./controllers/notes')
const auth = require('./middleware/auth.js')

const router = express.Router()

router.post('/login', users.login)
router.get('/logout', auth, users.logout)
router.post('/users', users.createUser)
router.patch('/users/:id', auth, users.updateUser)
router.delete('/users/:id', users.deleteUser)
router.get('/users/:id', users.getUser)
router.post('/createNote', auth, notes.createNote)
router.get('/getNotes', auth, notes.getNotes)
router.patch('/updateNote/:id', auth, notes.updateNote)
router.patch('/deleteNote/:id', auth, notes.deleteNote)

module.exports = router