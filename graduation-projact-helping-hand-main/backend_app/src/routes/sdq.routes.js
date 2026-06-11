const express = require('express');
const router = express.Router();
const {
  getSDQQuestions,
  submitSDQ,
  getSDQResult,
} = require('../controllers/sdq.controller');

const { protect, restrictTo } = require('../middleware/auth.middleware');

// All routes require login
router.use(protect);

// Get all 25 questions - parent only
router.get('/questions', restrictTo('parent'), getSDQQuestions);

// Submit SDQ answers for a child - parent only
router.post('/:childId', restrictTo('parent'), submitSDQ);

// Get SDQ result - parent or psychologist
router.get('/:childId', restrictTo('parent', 'psychologist'), getSDQResult);

module.exports = router;