const actors  = require('../data/actors.json')


class MainUtils {

  constructor() {}

  getActor (id) {
    return actors.find((actor)  => {
      return actor.id === id
    })
  }

  listActors (query) {
    let response = actors
    if (query && query.movies) {
      const moviesSet = new Set([...query.movies])
      response = actors.filter(actor => {
        let actorSet = new Set(actor.movies)
        let intersection = [...new Set([...moviesSet].filter(movie => actorSet.has(movie)))]
        if (intersection.length > 0)
          return actor
      })
    }
    return response
  }
}

exports.MainUtils = MainUtils
