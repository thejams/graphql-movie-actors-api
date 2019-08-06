'use strict'
require('dotenv').config()
const micro = require('micro')
const actorApi = require('./api/actors.js')
const actorsServer = micro(actorApi)

let port = process.env.PORT || 5000
actorsServer.listen(port)
console.log(`user service listen to ${port}`)
