import { useNavigate } from 'react-router-dom';

function FlightCard({ flight }) {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/booking', { state: { flight } });
  };

  return (
    <div className="flight-card">
      <h3>Uçuş ID: {flight.flight_id}</h3>
      <p><strong>Kalkış:</strong> {flight.from_city} | <strong>Varış:</strong> {flight.to_city}</p>
      <p><strong>Kalkış Saati:</strong> {new Date(flight.departure_time).toLocaleString()}</p>
      <p><strong>Varış Saati:</strong> {new Date(flight.arrival_time).toLocaleString()}</p>
      <p><strong>Fiyat:</strong> {flight.price} ₺</p>
      <p><strong>Boş Koltuk:</strong> {flight.seats_available}</p>
      <button onClick={handleBooking}>Rezerve Et</button>
    </div>
  );
}

export default FlightCard;
