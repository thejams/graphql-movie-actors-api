const actors  = require('../data/actors.json')


class MainUtils {

  constructor() {}

  getActor (id) {
    return actors.find((actor)  => {
      return actor.id === id
    })
  }

  listActors () {
    return actors
  }
}

exports.MainUtils = MainUtils
