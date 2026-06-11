const express = require('express');
const router = express.Router();
const {
  assignPsychologist,
  getAllPsychologists,
  getAllChildren,
  getClinicalReferrals, // New: To see kids scoring 17-40
  updateGameScenarios    // New: For dynamic content management
} = require('../controllers/admin.controller');

const { protect, restrictTo } = require('../middleware/auth.middleware');

router.use(protect);
router.use(restrictTo('admin'));

router.get('/psychologists',  getAllPsychologists);
router.get('/children',       getAllChildren);
router.put('/assign',         assignPsychologist);
router.get('/referrals/clinical', getClinicalReferrals); // Targets "Abnormal" scores 
router.patch('/settings/scenarios', updateGameScenarios); // Updates SDQ game items [cite: 46]

module.exports = router;