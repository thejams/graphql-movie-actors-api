'use strict'
const DataLoader = require('dataloader')
const ActorService = require('../services/actors.service')
const MovieService = require('../services/movies.service')
const { groupBy, flattenDeep } = require('lodash')
const actorService = new ActorService()
const movieService = new MovieService()


const ActorModel = ({ req }) => ({
  listActors: async (params) => {
    let response = await actorService.listActors(params, req)
    return response
  },
	getActor: async (id) => {
    let response = await actorService.getCategory(id, req)
    return response
  },
  getMovies: new DataLoader(async (actorsIds) => {
    let actors = actorsIds
    let response = await movieService.listMovies(actors, req)
    const actorsById = groupBy(response, 'actors')
    return actorsIds.map(categoryId => actorsById[categoryId])
  })
})


module.exports.ActorModel = ActorModel
