const express = require('express');
const router = express.Router();
const {
  createAssessment,
  submitGameResult,
  finalizeAssessment,
  getChildAssessments,
} = require('../controllers/assessment.controller');

const { protect, restrictTo } = require('../middleware/auth.middleware');

router.use(protect);

// Create new assessment session for a child
router.post(
  '/:childId',
  restrictTo('parent'),
  createAssessment
);

// Submit one game result
router.post(
  '/:assessmentId/games/:gameNumber',
  restrictTo('parent'),
  submitGameResult
);

// Finalize assessment and generate report
router.post(
  '/:assessmentId/finalize',
  restrictTo('parent'),
  finalizeAssessment
);

// Get all assessments for a child
router.get(
  '/:childId',
  restrictTo('parent', 'psychologist'),
  getChildAssessments
);

module.exports = router;