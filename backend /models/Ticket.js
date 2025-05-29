const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  ticket_id: {
    type: String,
    required: true,
    unique: true
  },
  passenger_name: {
    type: String,
    required: true
  },
  passenger_surname: {
    type: String,
    required: true
  },
  passenger_email: {
    type: String,
    required: true
  },
  flight_id: {
    type: String,
    required: true
  },
  seat_number: {
    type: String, 
    default: null
  }
});

module.exports = mongoose.model('Ticket', TicketSchema);
