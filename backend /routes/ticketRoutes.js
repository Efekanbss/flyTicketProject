const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Bilet oluştur (rezervasyon)
router.post('/', ticketController.bookTicket); // POST /tickets

// E-posta ile biletleri getir
router.get('/:email', ticketController.getTicketsByEmail); // GET /tickets/:email

module.exports = router;
