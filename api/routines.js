const express = require("express");
const {
  getAllPublicRoutines,
  createRoutine,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
  getRoutineActivitiesByRoutine,
  addActivityToRoutine,
} = require("../db");
const {
  UnauthorizedError,
  UnauthorizedUpdateError,
  UnauthorizedDeleteError,
  DuplicateRoutineActivityError,
} = require("../errors");
const validateToken = require("./helpers");
const router = express.Router();

// GET /api/routines
router.get("/", async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();
    res.send(routines);
  } catch (error) {
    next(error);
  }
});
// POST /api/routines
router.post("/", async (req, res, next) => {
  const { name, goal, isPublic = null } = req.body;
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
    const routineObj = { creatorId: isValidToken.id, name, goal, isPublic };
    const newRoutine = await createRoutine(routineObj);
    res.send(newRoutine);
  } catch (error) {}
});
// PATCH /api/routines/:routineId
router.patch("/:routineId", async (req, res, next) => {
  const routineId = req.params.routineId;
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
    const _routine = await getRoutineById(routineId);
    if (!_routine) {
      next({
        error: "RoutineNotFoundError",
        name: "RoutineNotFoundError",
        message: `Routine ${routineId} not found.`,
      });
    }
    if (_routine.creatorId !== isValidToken.id) {
      res.status(403);
      next({
        error: "UnauthorizedUpdateError",
        name: "UnauthorizedUpdateError",
        message: UnauthorizedUpdateError(isValidToken.username, _routine.name),
      });
    }
    const routineObj = {
      id: routineId,
      isPublic: req.body.isPublic,
      name: req.body.name,
      goal: req.body.goal,
    };
    const updatedRoutine = await updateRoutine(routineObj);
    res.send(updatedRoutine);
  } catch (error) {
    next(error);
  }
});
// DELETE /api/routines/:routineId
router.delete("/:routineId", async (req, res, next) => {
  const routineId = req.params.routineId;
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
    const _routine = await getRoutineById(routineId);
    if (!_routine) {
      next({
        error: "RoutineNotFoundError",
        name: "RoutineNotFoundError",
        message: `Routine ${routineId} not found.`,
      });
    }
    if (_routine.creatorId !== isValidToken.id) {
      res.status(403);
      next({
        error: "UnauthorizedDeleteError",
        name: "UnauthorizedDeleteError",
        message: UnauthorizedDeleteError(isValidToken.username, _routine.name),
      });
    }
    const destroyedRoutine = await destroyRoutine(routineId);
    destroyedRoutine.success = true;
    res.send(destroyedRoutine);
  } catch (error) {
    next(error);
  }
});
// POST /api/routines/:routineId/activities
router.post("/:routineId/activities", async (req, res, next) => {
  const routineId = req.params.routineId;
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
    const _routine = await getRoutineById(routineId);
    if (!_routine) {
      next({
        error: "RoutineNotFoundError",
        name: "RoutineNotFoundError",
        message: `Routine ${routineId} not found.`,
      });
    }
    if (_routine.creatorId !== isValidToken.id) {
      res.status(401);
      next({
        error: "UnauthorizedError",
        name: "UnauthorizedError",
        message: UnauthorizedError(),
      });
    }
    const routine = await getRoutineById(routineId);
    const _routineActivities = await getRoutineActivitiesByRoutine(routine);
    let routineActivityExists = false;
    _routineActivities.forEach((rA) => {
      if ((rA.activityId = req.body.activityId)) {
        routineActivityExists = true;
        return;
      }
    });
    if (routineActivityExists) {
      next({
        error: "DuplicateRoutineActivityError",
        name: "DuplicateRoutineActivityError",
        message: DuplicateRoutineActivityError(routineId, req.body.activityId),
      });
    } else {
      const newRAObj = {
        routineId,
        activityId: req.body.activityId,
        count: req.body.count,
        duration: req.body.duration,
      };
      const newRoutineActivity = await addActivityToRoutine(newRAObj);
      res.send(newRoutineActivity);
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
