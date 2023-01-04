const client = require("./client");
const { getUserByUsername } = require("./users");

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

    /* routine.activities.map( //try with for loop / just wait and refactor with sean's func demo
      //try promise all
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
    ) */

    routine.creatorName = creator.creatorName
    //console.log(routine)
    return routine
  } catch (error) {
    throw error
  }
}

async function getRoutinesWithoutActivities() {
  
}

async function getAllRoutines() {
  try {
    const { rows: routineIds } = await client.query(`
    SELECT routines.id
    FROM routines;
    `);

    return await Promise.all(
      routineIds.map((routine) => getRoutineById(routine.id))
    );
  } catch (error) {
    console.error("Can't get all routines: ", error);
  }
}

async function getAllPublicRoutines() {
  try {
    const routines = await getAllRoutines()
    return routines.filter(routine => {
      return routine.isPublic
    })    
  } catch (error) {
    throw error
  }
}

async function getAllRoutinesByUser({ username }) {
  try { //Probably revisit to clean up
    const user = await getUserByUsername(username)
    const routines = await getAllRoutines()
    return routines.filter(routine => {
      return routine.creatorId === user.id
    })
  } catch (error) {
    throw error
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const unfilteredRoutines = await getAllRoutinesByUser({ username })    
    return unfilteredRoutines.filter(routine => {
      return routine.isPublic
    })
  } catch (error) {
    throw error
  }
}

async function getPublicRoutinesByActivity({ id }) {
  //from activity id -> match all routineIds that are paired with actId -> avoid duplicates -> get routines from id -> filter by public
  try {
    const { rows: routineIdObjs } = await client.query(`
      SELECT DISTINCT routine_activities."routineId"
      FROM routine_activities
      WHERE "activityId" = $1;
    `, [id])

    const routinesById = await Promise.all(routineIdObjs.map(rObj => {
      return getRoutineById(rObj.routineId)
    }))

    return routinesById.filter(routine => routine.isPublic)
  } catch (error) {
    throw error
  }
}

async function updateRoutine({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  
  try {
    if (setString.length > 0) {
      const {
        rows: [routine],
      } = await client.query(`
        UPDATE routines 
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `, Object.values(fields));
        
      return routine;
    } else {
      return;
    }
  } catch (error) {
    throw error
  }
}

async function destroyRoutine(id) {
  try {
    await client.query(`
      DELETE FROM routine_activities
      WHERE routine_activities."routineId" = $1;
    `, [id])
    await client.query(`
      DELETE FROM routines
      WHERE routines.id = $1;
    `, [id])
  } catch (error) {
    throw error
  }
}

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
