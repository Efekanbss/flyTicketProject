// backend/controllers/cityController.js
const City = require('../models/City');

// Şehir ekle
exports.addCity = async (req, res) => {
  try {
    const { city_id, city_name } = req.body;
    const newCity = new City({ city_id, city_name });
    await newCity.save();
    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Çoklu şehir ekleme
exports.addCitiesBulk = async (req, res) => {
  try {
    const cities = req.body;
    const result = await City.insertMany(cities);
    res.status(201).json({ message: `${result.length} şehir eklendi.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Tüm şehirleri getir
exports.getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
