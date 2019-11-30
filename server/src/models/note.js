const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 80
  },
  body: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note