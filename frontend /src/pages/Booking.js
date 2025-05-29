import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Booking() {
  const { state } = useLocation();
  const flight = state?.flight;
  const navigate = useNavigate();

  const [passenger_name, setName] = useState('');
  const [passenger_surname, setSurname] = useState('');
  const [passenger_email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ticket = {
        ticket_id: "T" + Math.floor(Math.random() * 100000),
        passenger_name,
        passenger_surname,
        passenger_email,
        flight_id: flight.flight_id,
        seat_number: null
      };

      const res = await axios.post('http://localhost:3000/tickets', ticket);

      // Onay sayfasına yönlendir
      navigate('/booking-success', {
        state: {
          ticket,
          flight
        }
      });

    } catch (error) {
      console.error(error);
      alert('Bilet alınamadı.');
    }
  };

  if (!flight) return <p>Uçuş bilgisi bulunamadı.</p>;

  return (
    <div className="container">
      <h2>Rezervasyon: {flight.flight_id}</h2>
      <p><strong>Kalkış:</strong> {flight.from_city} → <strong>Varış:</strong> {flight.to_city}</p>
      <p><strong>Tarih:</strong> {new Date(flight.departure_time).toLocaleString()}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ad"
          value={passenger_name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Soyad"
          value={passenger_surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        /><br /><br />

        <input
          type="email"
          placeholder="E-posta"
          value={passenger_email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Bileti Al</button>
      </form>
    </div>
  );
}

export default Booking;
