const express = require('express')
const router = require('./routes.js')
require('./db/db.js')

const port = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(router)


app.listen(port, function () {
  console.log('Server up and running on port', port)
})