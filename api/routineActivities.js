const express = require("express");
const {
  getRoutineActivityById,
  getRoutineById,
  updateRoutineActivity,
} = require("../db");
const { UnauthorizedError, UnauthorizedUpdateError } = require("../errors");
const router = express.Router();

// PATCH /api/routine_activities/:routineActivityId
router.patch("/:routineActivityId", async (req, res, next) => {
  const routineActivityId = req.params.routineActivityId;
  try {
    const isValidToken = await validateToken(req);

    if (!isValidToken) {
      res.status(401);
      next({
        error: "UnauthorizedError",
        name: "UnauthorizedError",
        message: UnauthorizedError(),
      });
    }
    const _routineActivity = await getRoutineActivityById(routineActivityId);
    if (!_routineActivity) {
      next({
        error: "RoutineActivityNotFoundError",
        name: "RoutineActivityNotFoundError",
        message: `Routine Activity ${routineActivityId} not found.`,
      });
    }

    const _routine = await getRoutineById(_routineActivity.routineId);

    if (_routine.creatorId !== isValidToken.id) {
      res.status(403);
      next({
        error: "UnauthorizedUpdateError",
        message: UnauthorizedUpdateError(isValidToken.username, _routine.name),
        name: "UnauthorizedUpdateError",
      });
    }
    const routineActObj = {
      id: routineActivityId,
      count: req.body.count,
      duration: req.body.duration,
    };
    const updatedRoutineActivity = await updateRoutineActivity(routineActObj);
    res.send(updatedRoutineActivity);
  } catch (error) {
    next(error);
  }
});
// DELETE /api/routine_activities/:routineActivityId

module.exports = router;
