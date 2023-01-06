const express = require('express');
const router = express.Router();

// PATCH /api/routine_activities/:routineActivityId
router.patch('/:routineActivityId', async (req, res, next) => {
  const routineActivityId = req.params.routineActivityId
  try {
    
  } catch (error) {
    next(error)
  }
})

// DELETE /api/routine_activities/:routineActivityId

module.exports = router;
