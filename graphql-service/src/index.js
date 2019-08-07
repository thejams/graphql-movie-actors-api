'use strict'
require('dotenv').config()
const micro = require('micro')
const graphql = require('../src/api/graphql')

let port = process.env.PORT || 3000
const graphqlServer = micro(graphql)
graphqlServer.listen(port)
