import { useLocation, useNavigate } from 'react-router-dom';

function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const ticket = state?.ticket;
  const flight = state?.flight;

  if (!ticket || !flight) return <p>Bilet bilgisi bulunamadı.</p>;

  return (
    <div className="container">
      <h2>🎉 Bilet Başarıyla Alındı!</h2>
      <p><strong>Yolcu:</strong> {ticket.passenger_name} {ticket.passenger_surname}</p>
      <p><strong>E-posta:</strong> {ticket.passenger_email}</p>
      <p><strong>Uçuş:</strong> {flight.flight_id} ({flight.from_city} → {flight.to_city})</p>
      <p><strong>Kalkış:</strong> {new Date(flight.departure_time).toLocaleString()}</p>

      <button onClick={() => navigate('/')}>Ana Sayfaya Dön</button>
    </div>
  );
}

export default BookingSuccess;
