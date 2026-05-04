const express = require('express');
const router = express.Router();
const { getNearbyDoctors, searchDoctors, getTopDoctors, getSpecializations } = require('../controllers/doctorController');

router.get('/top', getTopDoctors);
router.get('/specializations', getSpecializations);
router.get('/nearby', getNearbyDoctors);
router.get('/search', searchDoctors);

module.exports = router;
