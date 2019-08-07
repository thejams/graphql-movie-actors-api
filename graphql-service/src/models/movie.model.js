'use strict'
const DataLoader = require('dataloader')
const MovieService = require('../services/movies.service')
const ActorService = require('../services/actors.service')
const { groupBy, flattenDeep } = require('lodash')
const movieService = new MovieService()
const actorService = new ActorService()

const MovieModel = ({ req }) => ({
  listMovies: async (params) => {
    let response = await movieService.listMovies(params, req)
    return response
  },
	getMovie: async (id) => {
    let response = await movieService.getMovie(id, req)
    return response
  },
  getActors: new DataLoader(async (moviesIds) => {
    let movies = moviesIds
    let response = await actorService.listActors(movies, req)
    const actorsById = groupBy(response, 'movies')
    return moviesIds.map(categoryId => actorsById[categoryId])
  })
})


module.exports.MovieModel = MovieModel
