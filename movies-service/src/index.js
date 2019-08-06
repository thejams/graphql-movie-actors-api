'use strict'
require('dotenv').config()
const micro = require('micro')
const movieApi = require('./api/movies.js')
const movieServer = micro(movieApi)

let port = process.env.PORT || 4000
movieServer.listen(port)
console.log(`user service listen to ${port}`)
