const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = function (req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'superSecret')
    User.findOne({
        _id: decoded._id,
        'tokens.token': token
      })
      .then(function (user) {
        if (!user) {
          throw new Error()
        }
        req.user = user
        req.token = token
        next()
      }).catch(function (error) {
        res.status(401).send({
          error: 'Please Authenticate'
        })
      })
  } catch (error) {
    res.status(401).send({
      error: 'Please Authenticate'
    })
  }
}

module.exports = auth