const jwt = require('jsonwebtoken')

const token = req.headers.authorization.split(' ').pop()
jwt.verify(token, 'Arcade-Sweet', (err, data)=> {
  console.log(data)
})

module.exports = token