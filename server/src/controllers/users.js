const User = require('../models/user.js')

const getUser = function (req, res) {
  _id = req.params.id
  User.findById(_id).then(function (user) {
    return res.send(user)
  }).catch(function (error) {
    return res.status(404).send({})
  })
}

const login = function (req, res) {
  User.findByCredentials(req.body.email, req.body.password).then(function (user) {
    user.generateToken().then(function (token) {
      return res.send({
        user,
        token
      })
    })
  }).catch(function (error) {
    return res.status(404).send(error)
  })
}

const logout = function (req, res) {
  req.user.tokens = req.user.tokens.filter(function (token) {
    return token.token !== req.token
  })
  req.user.save().then(function () {
    return res.send({})
  }).catch(function (error) {
    return res.status(500).send({
      error: error
    })
  })
}

const createUser = function (req, res) {
  const user = new User(req.body)
  user.save().then(function () {
    return res.send(user)
  }).catch(function (error) {
    return res.status(400).send(error)
  })
}

const updateUser = function (req, res) {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'password', 'email']
  // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }
  User.findByIdAndUpdate(_id, req.body).then(function (user) {
    if (!user) {
      return res.status(404).send({})
    }
    return res.send(user)
  }).catch(function (error) {
    res.status(500).send(error)
  })
}

const deleteUser = function (req, res) {
  const _id = req.params.id
  User.findByIdAndDelete(_id).then(function (user) {
    if (!user) {
      return res.status(404).send({})
    }
    return res.send(user)
  }).catch(function (error) {
    res.status(505).send(error)
  })
}

module.exports = {
  login,
  logout,
  createUser,
  updateUser,
  deleteUser,
  getUser
}