const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// GET /api/health
router.get("/health", async (req, res, next) => {
  res.send({
    message: "Server Working",
  });
});

// ROUTER: /api/users
const usersRouter = require("./users");
router.use("/users", usersRouter);

// ROUTER: /api/activities
const activitiesRouter = require("./activities");
router.use("/activities", activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require("./routines");
router.use("/routines", routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require("./routineActivities");
router.use("/routine_activities", routineActivitiesRouter);

// router.use((error, req, res, next) => {
//   if (error.name === "AuthorizationHeaderError") {
//     res.status(401).send(error);
//   }
//   res.send(error);
// });

module.exports = router;
