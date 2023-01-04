const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const { rows: [routine_activity] } = await client.query(`
      INSERT INTO routine_activities (
      "routineId", "activityId", count, duration)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ("routineId", "activityId") DO NOTHING
      RETURNING *;
    `, [routineId, activityId, count, duration])

    return routine_activity
  } catch (error) {
    console.error(`Can't add activity: ${activityId} to routine: ${routineId}`)
  }
}

async function getRoutineActivityById(id) {
  try {
    const { rows: [RA] } = await client.query(`
      SELECT * FROM routine_activities
      WHERE routine_activities.id = $1; 
    `, [id])
    return RA    
  } catch (error) {
    throw error
  }
}

async function getRoutineActivitiesByRoutine({ id }) {

}

async function updateRoutineActivity({ id, ...fields }) {

}

async function destroyRoutineActivity(id) {

}

async function canEditRoutineActivity(routineActivityId, userId) {
  
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
