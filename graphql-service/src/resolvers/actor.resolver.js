module.exports = {
  Query: {
    getActor: async (parent, {id}, context) => {
      let response = await context.models.Actor.getActor(id)
      return response
    },
    listActors: async (parent, {limit, page}, context) => {
      let response = await context.models.Actor.listActors({limit, page})
      return response
    }
  },
  Actor: {
    movies: async (parent, {}, context) => {
      let response = await context.models.Actor.getMovies.load([parent.id])
      return response
    }
  }
}
  