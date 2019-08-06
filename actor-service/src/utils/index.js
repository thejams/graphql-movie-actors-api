const actors  = require('../data/actors.json')


class MainUtils {

  constructor() {}

  getActor (id) {
    return actors[0]
  }

  listActors () {
    return actors
  }
}

exports.MainUtils = MainUtils
