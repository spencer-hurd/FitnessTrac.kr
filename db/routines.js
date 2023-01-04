const { query } = require("express");
const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const { rows: [routine] } = await client.query(`
      INSERT INTO routines (
      "creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [creatorId, isPublic, name, goal])

    return routine
  } catch (error) {
    console.error(`Can not create routine named: ${ name }`)
  }
}

async function getRoutineById(id) {
  try {
    const { rows: [routine] } = await client.query(`
      SELECT * FROM routines
      WHERE id = $1;
    `, [id])
    
    /* if (!routine) {
      throw {

      }
    } */

    const { rows: activities } = await client.query(`
      SELECT activities.*, routine_activities.duration, routine_activities.count
      FROM activities
      JOIN routine_activities ON activities.id = routine_activities."activityId"
      WHERE routine_activities."routineId" = $1;
    `, [id])

    const { rows: [creator] } = await client.query(`
      SELECT users.username as "creatorName"
      FROM users
      JOIN routines ON users.id = routines."creatorId"
      WHERE routines.id = $1;
    `, [id])

    routine.activities = activities
    routine.activities.map(
      activity => activity.routineId = id
    )
    routine.activities.map( //try with for loop / just wait and refactor with sean's func demo
      async activity => {
        const { rows: [routineActivityId] } = await client.query(`
          SELECT routine_activities.id
          FROM routine_activities
          WHERE routine_activities."routineId" = $1
          AND routine_activities."activityId" = $2; 
        `, [activity.routineId, activity.id])
        console.log(routineActivityId.id)
        activity.routineActivityId = routineActivityId.id
      }
    )
    /* routine.activities.map(
      activity => activity.routineActivityId = 22
    ) */
    routine.creatorName = creator.creatorName
    console.log(routine)
    return routine
  } catch (error) {
    throw error
  }
}

async function getRoutinesWithoutActivities() {}

async function getAllRoutines() {

  try {
    const { rows: routineIds } = await client.query(`
      SELECT routines.id
      FROM routines;
    `)

    return await Promise.all(routineIds.map(
      routine => getRoutineById(routine.id)
    ))
  } catch (error) {
    console.error(error)
  }
}

async function getAllPublicRoutines() {}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {}

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
