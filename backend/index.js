const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()

app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

mongoose.connect(
  process.env.DBURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log('err-----------------------------------------', err)
    } else {
      console.log('process.env.DBURL', process.env.DBURL)
    }
  }
)

app.use(express.static('./img'))
require('./router')(app)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
