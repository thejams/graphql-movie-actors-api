const movies  = require('../data/movies.json')


class MainUtils {

  constructor() {}

  getMovie (id) {
    return movies.find((actor)  => {
      return actor.id === id
    })
  }

  listMovies (query) {
    let response = movies
    if (query && query.actors) {
        const actorsSet = new Set([...query.actors])
        response = movies.filter(movie => {
            let moviesSet = new Set(movie.actors)
            let intersection = [...new Set([...actorsSet].filter(actor => moviesSet.has(actor)))]
            if (intersection.length > 0)
                return movie
        })
    }
    return response
  }
}

exports.MainUtils = MainUtils
