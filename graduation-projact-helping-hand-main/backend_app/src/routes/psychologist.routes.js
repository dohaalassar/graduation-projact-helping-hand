const express = require('express');
const router = express.Router();
const {
  getAssignedChildren,
  getChildFullReport,
  sendNotification,
  approveAssessment,
  getCaseActions,
  getDashboard,
} = require('../controllers/psychologist.controller');

const { protect, restrictTo } = require('../middleware/auth.middleware');

router.use(protect);
router.use(restrictTo('psychologist'));

router.get('/dashboard',                          getDashboard);
router.get('/children',                           getAssignedChildren);
router.get('/children/:childId/report',           getChildFullReport);
router.post('/children/:childId/notify',          sendNotification);
router.post('/children/:childId/approve',         approveAssessment);
router.get('/children/:childId/actions',          getCaseActions);

module.exports = router;