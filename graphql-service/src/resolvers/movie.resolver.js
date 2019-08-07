module.exports = {
  Query: {
    getMovie: async (parent, {id}, context) => {
      let response = await context.models.Movie.getMovie(id)
      return response
    },
    listMovies: async (parent, {limit, page}, context) => {
      let response = await context.models.Movie.listMovies({limit, page})
      return response
    }
  },
  Movie: {
    actors: async (parent, {}, context) => {
      // let response = await categoryEventsDataLoader.load([parent._id])
      let response = await context.models.Movie.getActors.load([parent.id])
      return response
    }
  }
}
    