jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

const validateToken = async (req) => {
  const prefix = 'Bearer '
  const auth = req.header('Authorization')

  //If the header contains no value to Auth...
  if (!auth){
    return false
  } else if (auth.startsWith(prefix)) { //Alright let's see if the token matches
    const token = auth.slice(prefix.length)

    try {
      const { id, username } = jwt.verify(token, JWT_SECRET)

      if (id) {
        return {id, username, token}
      }
    } catch ({ name, message }) { //Invalid token
      return { name, message}
    }
  } else { //Gotta make the right request bingo
    return {
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with '${ prefix }' ya dingus!`
    }
  }
}

module.exports = validateToken