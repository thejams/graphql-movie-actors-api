const { ApolloServer } = require('apollo-server-micro')
const { router, get, post } = require('microrouter')
const microCors = require('micro-cors')
const { typeDefs } = require('../typedefs')
const { resolvers } = require('../resolvers')
const { ActorModel } = require('../models/actor.model')
const { MovieModel } = require('../models/movie.model')
const cors = microCors({
  allowMethods: ['PUT', 'POST', 'GET', 'DELETE'],
  allowHeaders: [['company', 'X-Requested-With', 'Access-Control-Allow-Origin', 'X-HTTP-Method-Override', 'Content-Type', 'Authorization', 'Accept', 'x-access-token']]
})
const env = process.env.NODE_ENV || 'dev'
const graphqlPath = '/graphiql'
const apolloServer = new ApolloServer({
  typeDefs, 
  resolvers, 
  graphiql: (env === 'dev' ? true : false),
  context: ({ req }) => {
    return {
      models: {
        Actor: ActorModel({ req }),
        Movie: MovieModel({ req })
      }
    }
  }
})
const graphqlHandler = cors(apolloServer.createHandler({ path: graphqlPath }))

module.exports = router(
  get('/', (req, res) => 'Welcome!'),
  post(graphqlPath, graphqlHandler),
  get(graphqlPath, graphqlHandler)
)
