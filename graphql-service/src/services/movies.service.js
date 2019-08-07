const axios = require('axios')
const url = process.env.EVENT_SERVICE_URL || 'http://localhost:4000'

class MovieService {
  constructor() {
    this.url = url
  }

  async listMovies (params, req) {
    let { headers } = req
    if (params){
      params = JSON.stringify(params)
    }
    const response = await new Promise((resolve, reject) => {
      axios.get(`${this.url}/`, {
        params,
        timeout: 5000,
        headers
      })
      .then(res => {
          console.log(`success get all movies resources`)
          resolve(res.data)
      })
      .catch(err => { reject(err) })
    })
    return Promise.resolve(response);
  }

  async getMovie (id, req) {
    const response = await new Promise((resolve, reject) => {
      axios.get(`${this.url}/${id}`, { timeout: 5000 })
      .then(res => {
        console.log(`success get movie resource`)
        resolve(res.data)
      })
      .catch(err => { reject(err) })
    })
    return Promise.resolve(response);
  }
}

module.exports = MovieService
