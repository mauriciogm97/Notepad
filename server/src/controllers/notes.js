const Note = require('../models/note')

const getNotes = function (req, res) {
  Note.find({
    createdBy: req.user._id
  }).then(function (notes) {
    res.send(notes)
  }).catch(function (error) {
    res.status(500).send(error)
  })
}

const createNote = function (req, res) {
  const note = new Note({
    createdBy: req.user._id
  })
  note.save().then(function () {
    return res.send(note)
  }).catch(function (error) {
    return res.status(400).send({
      error: error
    })
  })
}

const updateNote = function (req, res) {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'body']

  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }

  Note.findOneAndUpdate({
    _id,
    createdBy: req.user._id
  }, req.body, {
    new: true
  }).then(function (note) {
    if (!note) {
      return res.status(404).send({
        error: `Note with id ${_id} not found.`
      })
    }
    return res.send(note)
  }).catch(function (error) {
    return res.status(500).send({
      error: error
    })
  })
}

const deleteNote = function (req, res) {
  const _id = req.params.id
  Note.findOneAndDelete({
    _id,
    createdBy: req.user._id
  }).then(function (note) {
    if (!note) {
      return res.status(404).send({
        error: `Note with id ${_id} not found.`
      })
    }
    return res.send(note)
  }).catch(function (error) {
    res.status(505).send({
      error: error
    })
  })
}

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote
}