const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// Yeni uçuş ekleme
router.post('/', flightController.addFlight); // POST /flights

// Tüm uçuşları listeleme
router.get('/', flightController.getFlights); // GET /flights

router.put('/:id', flightController.updateFlight);

router.delete('/:id', flightController.deleteFlight);


module.exports = router;
