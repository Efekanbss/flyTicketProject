const Flight = require('../models/Flight');

// Uçuş ekleme
exports.addFlight = async (req, res) => {
  try {
    const {
      flight_id,
      from_city,
      to_city,
      departure_time,
      arrival_time,
      price,
      seats_total,
      seats_available
    } = req.body;

    // Kurallar:
    if (from_city === to_city) {
      return res.status(400).json({ message: 'Uçuş kalkış ve varış şehirleri aynı olamaz.' });
    }

    // Aynı şehirden aynı saatte kalkış kontrolü
    const existingDeparture = await Flight.findOne({
      from_city,
      departure_time: new Date(departure_time)
    });
    if (existingDeparture) {
      return res.status(400).json({ message: 'Bu şehirden bu saatte başka bir uçuş mevcut.' });
    }

    // Aynı şehirde aynı saatte iniş kontrolü
    const existingArrival = await Flight.findOne({
      to_city,
      arrival_time: new Date(arrival_time)
    });
    if (existingArrival) {
      return res.status(400).json({ message: 'Bu saatte bu şehre başka bir uçuş iniyor.' });
    }

    const newFlight = new Flight({
      flight_id,
      from_city,
      to_city,
      departure_time,
      arrival_time,
      price,
      seats_total,
      seats_available
    });

    await newFlight.save();
    res.status(201).json(newFlight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tüm uçuşları listele
exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateFlight = async (req, res) => {
  try {
    const updated = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteFlight = async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Uçuş silindi.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

