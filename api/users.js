/* eslint-disable no-useless-catch */
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

const express = require("express");
const { getUserByUsername, createUser, getUser, getUserById, getPublicRoutinesByUser, getAllRoutinesByUser } = require('../db');
const validateToken = require('./helpers');
const { UserTakenError, UnauthorizedError, PasswordTooShortError } = require('../errors');
const router = express.Router();

// POST /api/users/register
router.post('/register', async (req, res, next) => {
  const { username, password } = req.body
  
  try {
    const userCheck = await getUserByUsername(username)

    if (userCheck) {
      next({
        error: 'UserTakenError',
        message: UserTakenError(username),
        name: 'UserTakenError'
      })
    }

    if(password.length < 8){
      next({
        error: 'InvalidPasswordLength',
        name: 'InvalidPasswordLength',
        message: PasswordTooShortError()
      })
    }

    const newUser = await createUser({
      username,
      password
    })

    const token = jwt.sign({
      id: newUser.id,
      username: newUser.username
    }, JWT_SECRET, {
      expiresIn: '1w'
    })

    res.send({
      message: "Hey you registered wow!",
      token,
      user: newUser
    })
  } catch (error) {
    next(error)
  }
})

// POST /api/users/login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  if (!username||!password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply a username AND a password. You know how this works...'
    })
  }

  try {
    const user = await getUser({username, password})

    if (user) {
      const sig = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET)
      res.send({ 
        message: "you're logged in!",
        token: sig,
        user
      })
    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect. Dishonor on your cow.'
      })
    }
  } catch (error) {
    next(error)
  }
})

// GET /api/users/me
router.get('/me', async (req, res, next) => {
  const prefix = 'Bearer '
  const auth = req.header('Authorization')

  //If the header contains no value to Auth...
  if (!auth){
    res.status(401)
    next({
      error: 'AuthorizationHeaderError',
      message: UnauthorizedError(),
      name: 'AuthorizationHeaderError'
    })
  } else if (auth.startsWith(prefix)) { //Alright let's see if the token matches
    const token = auth.slice(prefix.length)

    try {
      const { id } = jwt.verify(token, JWT_SECRET)

      if (id) {
        const user = await getUserById(id)
        res.send(user)
      }
    } catch ({ name, message }) { //Invalid token
      next({ name, message})
    }
  } else { //Gotta make the right request bingo
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with '${ prefix }' ya dingus!`
    })
  }
})

// GET /api/users/:username/routines
router.get('/:username/routines', async (req, res, next) => {
  const username = req.params.username

  try {
    const tokenData = await validateToken(req)
    const user = await getUserByUsername(username)
    if (!user) {
      next({
        error: 'InvalidUserError',
        name: 'InvalidUserError',
        message: `User: ${username} does not exist.`
      })
    }

    if (username === tokenData.username){
      const allUserRoutines = await getAllRoutinesByUser(user)
      res.send(allUserRoutines)
    } else {
      const pubRoutines = await getPublicRoutinesByUser(user)
      res.send(pubRoutines)
    }

  } catch ({error, name, message}) {
    next({
      error,
      name,
      message
    })
  }
})

module.exports = router;
