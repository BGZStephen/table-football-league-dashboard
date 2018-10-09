const env = process.env.NODE_ENV

const configs = {
  development: {
    apiUrl: 'http://localhost:3000'
  }
}

export default configs[env];