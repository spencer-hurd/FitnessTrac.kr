/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const {
  getUserByUsername,
  createUser,
  getUser,
  getUserById,
} = require("../db/users");
const jwt = require("jsonwebtoken");
const {
  UserTakenError,
  PasswordTooShortError,
  UnauthorizedError,
} = require("../errors");
const validateToken = require("./helpers");
const { getAllRoutinesByUser, getPublicRoutinesByUser } = require("../db");
const { JWT_SECRET } = process.env;

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        error: "UserTakenError",
        message: UserTakenError(username),
        name: "UserTakenError",
      });
    }
    if (password.length < 8) {
      next({
        name: "PasswordTooShortError",
        error: "PasswordTooShortError",
        message: PasswordTooShortError(),
      });
    }

    const user = await createUser({
      username,
      password,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "thank you for signing up",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
});
// POST /api/users/login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and a password",
    });
  }
  try {
    const user = await getUser({ username, password });

    if (user) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ message: "you're logged in!", token: token, user });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect.",
      });
    }
  } catch (error) {
    next(error);
  }
});
// GET /api/users/me
router.get("/me", async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    res.status(401);
    next({
      name: "AuthorizationHeaderError",
      message: UnauthorizedError(),
      error: "AuthorizationHeaderError",
    });
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        const user = await getUserById(id);
        res.send(user);
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});
// GET /api/users/:username/routines
router.get("/:username/routines", async (req, res, next) => {
  const username = req.params.username;

  try {
    const tokenData = await validateToken(req);
    const user = await getUserByUsername(username);
    if (!user) {
      next({
        error: "InvalidUserError",
        name: "InvalidUserError",
        message: `User: ${username}`,
      });
    }

    if (username === tokenData.username) {
      const allUserRoutines = await getAllRoutinesByUser(user);
      res.send(allUserRoutines);
    } else {
      const pubRoutines = await getPublicRoutinesByUser(user);
      res.send(pubRoutines);
    }
  } catch ({ error, name, message }) {
    next({ error, name, message });
  }
});
module.exports = router;
