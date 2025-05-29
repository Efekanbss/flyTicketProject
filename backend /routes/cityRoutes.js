// backend/routes/cityRoutes.js
const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.post('/', cityController.addCity);     // POST /cities
router.post('/bulk', cityController.addCitiesBulk); // POST /cities/bulk

router.get('/', cityController.getCities);    // GET /cities

module.exports = router;
