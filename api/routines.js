const express = require("express");
const {
  getAllPublicRoutines,
  createRoutine,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  getRoutineByName,
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
    const pubRoutines = await getAllPublicRoutines();
    res.send(pubRoutines);
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
        message: UnauthorizedError(),
        name: "UnauthorizedError",
      });
    }

    const _routine = await getRoutineByName(name)

    if (_routine) {
      next({
        error: 'DuplicateRoutineError',
        message: `A routine with name ${name} already exists.`,
        name: 'DuplicateRoutineError'
      })
    }

    const routineObj = {
      creatorId: isValidToken.id,
      name,
      goal,
      isPublic,
    };
    const newRoutine = await createRoutine(routineObj);
    res.send(newRoutine);
  } catch (error) {
    next(error);
  }
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
        message: UnauthorizedError(),
        name: "UnauthorizedError",
      });
    }

    const _routine = await getRoutineById(routineId);

    if (!_routine) {
      next({
        error: "RoutineNotFoundError",
        name: "RoutineNotFoundError",
        message: `Routine ${routineId} not found`,
      });
    }

    if (_routine.creatorId !== isValidToken.id) {
      res.status(403);
      next({
        error: "UnauthorizedUpdateError",
        message: UnauthorizedUpdateError(isValidToken.username, _routine.name),
        name: "UnauthorizedUpdateError",
      });
    } else {
      const routineObj = {
        id: routineId,
        name: req.body.name,
        goal: req.body.goal,
        isPublic: req.body.isPublic,
      };
      const updatedRoutine = await updateRoutine(routineObj);
      res.send(updatedRoutine);
  }
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
        message: UnauthorizedError(),
        name: "UnauthorizedError",
      });
    }

    const _routine = await getRoutineById(routineId);

    if (!_routine) {
      next({
        error: "RoutineNotFoundError",
        name: "RoutineNotFoundError",
        message: `Routine ${routineId} not found`,
      });
    }

    if (_routine.creatorId !== isValidToken.id) {
      res.status(403);
      console.log(`-----------> _routine.creatorId ${_routine.creatorId} does not match isValidToken.id ${isValidToken.id}`)
      next({
        error: "UnauthorizedDeleteError",
        message: UnauthorizedDeleteError(isValidToken.username, _routine.name),
        name: "UnauthorizedDeleteError",
      });
    } else {
        const destroyedRoutine = await destroyRoutine(routineId);
        destroyedRoutine.success = true;
        res.send(destroyedRoutine);
    }
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
        message: UnauthorizedError(),
        name: "UnauthorizedError",
      });
    }
    const _routine = await getRoutineById(routineId);

    if (!_routine) {
      next({
        error: "RoutineNotFoundError",
        name: "RoutineNotFoundError",
        message: `Routine ${routineId} not found`,
      });
    }

    if (_routine.creatorId !== isValidToken.id) {
      res.status(401);
      next({
        error: "UnauthorizedError",
        message: UnauthorizedError(),
        name: "UnauthorizedError",
      });
    }

    //Check if the id pair exists
    const _routineActivities = await getRoutineActivitiesByRoutine(_routine);

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
        message: DuplicateRoutineActivityError(routineId, req.body.activityId),
        name: "DuplicateRoutineActivityError",
      });
    }

    const newRAObj = {
      routineId,
      activityId: req.body.activityId,
      count: req.body.count,
      duration: req.body.duration,
    };
    const newRoutineActivity = await addActivityToRoutine(newRAObj);
    res.send(newRoutineActivity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
