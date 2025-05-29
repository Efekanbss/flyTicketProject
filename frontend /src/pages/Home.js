import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlightCard from '../components/FlightCard';


function Home() {
  const [flights, setFlights] = useState([]);
  const [cities, setCities] = useState([]);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  
  useEffect(() => {
    axios.get('http://localhost:3000/cities')
      .then(res => setCities(res.data))
      .catch(err => console.error('Şehirler alınamadı:', err));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get('http://localhost:3000/flights');
      
      
      const filtered = response.data.filter(flight =>
        flight.from_city === fromCity &&
        flight.to_city === toCity &&
        flight.departure_time.startsWith(departureDate)
      );
  
      setFlights(filtered);
    } catch (error) {
      console.error('Uçuşlar alınamadı:', error);
    }
  };
  

  return (
    <div className="container">
      <h1>Ana Sayfa - Uçuş Arama</h1>
      <form onSubmit={handleSearch}>
        <div>
          <label>Kalkış Şehri: </label>
          <select value={fromCity} onChange={(e) => setFromCity(e.target.value)} required>
            <option value="">Seçiniz</option>
            {cities.map(city => (
              <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Varış Şehri: </label>
          <select value={toCity} onChange={(e) => setToCity(e.target.value)} required>
            <option value="">Seçiniz</option>
            {cities.map(city => (
              <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tarih: </label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Uçuş Ara</button>
      </form>
      <h2>Uygun Uçuşlar:</h2>
{flights.length === 0 ? (
  <p>Uygun uçuş bulunamadı.</p>
) : (
  flights.map(flight => (
    <FlightCard key={flight._id} flight={flight} />
  ))
)}

    </div>
  );
}

export default Home;
