const express = require("express");
const { getPublicRoutinesByActivity } = require("../db");
const {
  getAllActivities,
  createActivity,
  getActivityByName,
  updateActivity,
  getActivityById,
} = require("../db/activities");
const {
  UnauthorizedError,
  ActivityExistsError,
  ActivityNotFoundError,
} = require("../errors");
const validateToken = require("./helpers");
const router = express.Router();

// GET /api/activities
router.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

// POST /api/activities
router.post("/", async (req, res, next) => {
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
    const activityExists = await getActivityByName(req.body.name);
    if (!activityExists) {
      const newActivity = await createActivity(req.body);
      res.send(newActivity);
    } else {
      next({
        error: "ActivityExistsError",
        name: "ActivityExistsError",
        message: ActivityExistsError(req.body.name),
      });
    }
  } catch (error) {
    next(error);
  }
});
// PATCH /api/activities/:activityId
router.patch("/:activityId", async (req, res, next) => {
  const activityId = req.params.activityId;
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

    const activityExists = await getActivityById(activityId);
    if (!activityExists) {
      next({
        error: "ActivityNotFoundError",
        name: "ActivityNotFoundError",
        message: ActivityNotFoundError(activityId),
      });
    }

    const oldActivityName = activityExists.name;
    const doesNewNameExist = await getActivityByName(req.body.name);

    if (!doesNewNameExist || oldActivityName === req.body.name) {
      const updatedActivity = await updateActivity({
        id: activityId,
        name: req.body.name,
        description: req.body.description,
      });
      res.send(updatedActivity);
    } else {
      next({
        name: "ActivityExistsError",
        message: ActivityExistsError(req.body.name),
        error: "ActivityExistsError",
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/activities/:activityId/routines
router.get("/:activityId/routines", async (req, res, next) => {
  const activityId = req.params.activityId;
  try {
    const activityExists = await getActivityById(activityId);
    if (!activityExists) {
      next({
        error: "ActivityNotFoundError",
        name: "ActivityNotFoundError",
        message: ActivityNotFoundError(activityId),
      });
    } else {
      const argObj = {
        id: activityId,
      };
      const routines = await getPublicRoutinesByActivity(argObj);
      res.send(routines);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
