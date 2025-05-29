const Ticket = require('../models/Ticket');
const Flight = require('../models/Flight');

// Bilet oluştur
exports.bookTicket = async (req, res) => {
  try {
    const {
      ticket_id,
      passenger_name,
      passenger_surname,
      passenger_email,
      flight_id,
      seat_number
    } = req.body;

    // Uçuş kontrolü
    const flight = await Flight.findOne({ flight_id });

    if (!flight) {
      return res.status(404).json({ message: 'Uçuş bulunamadı.' });
    }

    if (flight.seats_available <= 0) {
      return res.status(400).json({ message: 'Bu uçuşta boş koltuk kalmadı.' });
    }

    // Yeni bilet oluştur
    const newTicket = new Ticket({
      ticket_id,
      passenger_name,
      passenger_surname,
      passenger_email,
      flight_id,
      seat_number
    });

    await newTicket.save();

    // Koltuk sayısını azalt
    flight.seats_available -= 1;
    await flight.save();

    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// E-posta ile biletleri getir
exports.getTicketsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const tickets = await Ticket.find({ passenger_email: email });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
