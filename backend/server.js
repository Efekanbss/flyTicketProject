// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// DB Bağlantısı
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch(err => console.error("MongoDB bağlantı hatası:", err));


app.get('/', (req, res) => {
  res.send('FlyTicket API çalışıyor!');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});


const cityRoutes = require('./routes/cityRoutes');
app.use('/cities', cityRoutes);


const flightRoutes = require('./routes/flightRoutes');
app.use('/flights', flightRoutes);


const ticketRoutes = require('./routes/ticketRoutes');
app.use('/tickets', ticketRoutes);


const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);
