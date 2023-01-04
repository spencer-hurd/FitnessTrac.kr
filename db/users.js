const client = require("./client");
const bcrypt = require("bcrypt");

// database functions

// user functions
async function createUser({ username, password }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username;
    `,
      [username, hashedPassword]
    );

    return user;
  } catch (error) {
    console.error(`Error creating user: ${username}`, error);
  }
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashMatch = await bcrypt.compare(password, user.password);
  try {
    if (hashMatch) {
      delete user.password;
      return user;
    } else {
      console.log("Passwords do not match");
      throw new Error();
    }
  } catch (error) {
    console.error(`Problem fetching user: ${username}`, error);
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username FROM users
      WHERE id = $1;
    `,
      [userId]
    );

    return user;
  } catch (error) {
    console.error(`Could not fetch user ${userId} by their id`, error);
  }
}

async function getUserByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT id, username, password FROM users
          WHERE username = $1;
        `,
      [userName]
    );
    return user;
  } catch (error) {
    console.error(`Error fetching user by name: ${userName}`, error);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
