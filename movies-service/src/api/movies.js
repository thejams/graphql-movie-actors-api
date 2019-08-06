'use strict'
const {send, json} = require('micro')
const microCors = require('micro-cors')
const HttpHash = require('http-hash')
const qs = require('querystring')
const URL = require('url')
const { MainUtils } = require('../utils')
const cors = microCors({
  allowMethods: ['PUT', 'POST', 'GET', 'DELETE'],
  allowHeaders: [['company', 'X-Requested-With', 'Access-Control-Allow-Origin', 'X-HTTP-Method-Override', 'Content-Type', 'Authorization', 'Accept', 'x-access-token']]
})
const env = process.env.NODE_ENV || 'dev'
const hash = HttpHash()
const mainUtils = new MainUtils()


/**
 * @description get a list of all movies.
 * @method listMovies
 * @param {Object} req. a request object.
 * @param {Object} res. a response object.
 * @param {Object} params. all the params of the request.
 * @return {promise} response, an object with the information of the user including refresh and access tokens.
 */
hash.set('GET /', async function listMovies (req, res, params) {
  try {
    if ('0' in req.query)
      req.query = JSON.parse(req.query['0'])
    else if (req.query && req.query.actors)
      req.query.actors = JSON.parse(req.query.actors)
    let actors = mainUtils.listMovies(req.query)
    return send(res, 200, actors)
  } catch (err) {
    return send(res, 500, { error: err.message })
  }
})

/**
 * @description get a specific movie.
 * @method getMovie
 * @param {Object} req. a request object.
 * @param {Object} res. a response object.
 * @param {Object} params. all the params of the request.
 * @return {promise} response, an object with the information of the user including refresh and access tokens.
 */
hash.set('GET /:id', async function getMovie (req, res, params) {
  try {
    let actor = mainUtils.getMovie(params.id)
    if (actor)
      return send(res, 200, actor)
    return send(res, 404, {error: 'actor not found'})
  } catch (err) {
    return send(res, 500, { error: err.message })
  }
})

/**
 * @description Main router of the authentication-microservice using zeit/micro library
 * @description For query strings manipulation (route?value=1):
 * @description   # parse the url of the request object into a url object (URL.parse(url))
 * @description   # get the "query" attribute (qs.parse(url.query))
 * @description   # parse the "query" attribute into a query object
 * @description   # pass to the "hash.get" method the "url.pathname" (url without query strings)
 * @description For normal params manipulation (route/5):
 * @description   # declare the endpoint with "route/:param" structure
 * @description   # http-hash add all this types of params in the "params" attribute
 * @description For body params manipulation:
 * @description   # use the "json(req)" module of micro to get all the body params inside the request object
 * @description   # assign the json to a variable
 */
const handler = async (req, res) => {
  let { method, url } = req
  url = URL.parse(url)
  let query = qs.parse(url.query)
  let match = hash.get(`${method.toUpperCase()} ${url.pathname}`)
  if (match.handler) {
    try {
      req.query = query
      await match.handler(req, res, match.params)
    } catch (e) {
      console.log(e)
      const data = { error: e }
      send(res, 500, data)
    }
  } else {
    send(res, 404, { error: `endpoint not found ${process.env.PORT}` })
  }
}

module.exports = cors(handler)
