const movies  = require('../data/movies.json')


class MainUtils {

  constructor() {}

  getMovie (id) {
    return movies.find((actor)  => {
      return actor.id === id
    })
  }

  listMovies () {
    return movies
  }
}

exports.MainUtils = MainUtils
