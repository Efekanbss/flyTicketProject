import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminPanel() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [cities, setCities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    flight_id: '',
    from_city: '',
    to_city: '',
    departure_time: '',
    arrival_time: '',
    price: '',
    seats_total: '',
    seats_available: ''
  });

  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      alert("Bu sayfaya erişmek için giriş yapmalısınız.");
      navigate('/admin');
    } else {
      fetchFlights();
      fetchCities();
    }
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await axios.get('http://localhost:3000/flights');
      setFlights(res.data);
    } catch (error) {
      console.error('Uçuşlar alınamadı:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await axios.get('http://localhost:3000/cities');
      setCities(res.data);
    } catch (error) {
      console.error('Şehirler alınamadı:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu uçuşu silmek istediğinizden emin misiniz?")) return;
    try {
      await axios.delete(`http://localhost:3000/flights/${id}`);
      alert('Uçuş silindi');
      fetchFlights();
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Uçuş silinemedi.');
    }
  };

  const handleEdit = (flight) => {
    setShowForm(true);
    setIsEditing(true);
    setEditingId(flight._id);
    setFormData({
      flight_id: flight.flight_id,
      from_city: flight.from_city,
      to_city: flight.to_city,
      departure_time: flight.departure_time.slice(0, 16),
      arrival_time: flight.arrival_time.slice(0, 16),
      price: flight.price,
      seats_total: flight.seats_total,
      seats_available: flight.seats_available
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/flights/${editingId}`, formData);
        alert('Uçuş güncellendi!');
      } else {
        await axios.post('http://localhost:3000/flights', formData);
        alert('Uçuş eklendi!');
      }
      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
      fetchFlights();
    } catch (err) {
      console.error('Hata:', err);
      alert('İşlem başarısız.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin');
  };

  return (
    <div className="container">
      <h2>Admin Panel – Uçuşlar</h2>
      <button onClick={handleLogout}>Çıkış Yap</button>
      <br /><br />
      <button onClick={() => {
        setShowForm(!showForm);
        setIsEditing(false);
        setEditingId(null);
        setFormData({
          flight_id: '',
          from_city: '',
          to_city: '',
          departure_time: '',
          arrival_time: '',
          price: '',
          seats_total: '',
          seats_available: ''
        });
      }}>
        {showForm ? "Formu Kapat" : "Yeni Uçuş Ekle"}
      </button>

      {showForm && (
        <form onSubmit={handleCreate} style={{ marginTop: '1rem', border: '1px solid gray', padding: '1rem' }}>
          <h4>{isEditing ? "Uçuşu Güncelle" : "Yeni Uçuş Ekle"}</h4>

          <input type="text" placeholder="Flight ID" required
            value={formData.flight_id}
            onChange={(e) => setFormData({ ...formData, flight_id: e.target.value })}
          /><br />

          <select required value={formData.from_city}
            onChange={(e) => setFormData({ ...formData, from_city: e.target.value })}>
            <option value="">Kalkış Şehri</option>
            {cities.map(c => <option key={c.city_id} value={c.city_id}>{c.city_name}</option>)}
          </select><br />

          <select required value={formData.to_city}
            onChange={(e) => setFormData({ ...formData, to_city: e.target.value })}>
            <option value="">Varış Şehri</option>
            {cities.map(c => <option key={c.city_id} value={c.city_id}>{c.city_name}</option>)}
          </select><br />

          <label>Kalkış Saati:</label>
          <input type="datetime-local" required
            value={formData.departure_time}
            onChange={(e) => setFormData({ ...formData, departure_time: e.target.value })}
          /><br />

          <label>Varış Saati:</label>
          <input type="datetime-local" required
            value={formData.arrival_time}
            onChange={(e) => setFormData({ ...formData, arrival_time: e.target.value })}
          /><br />

          <input type="number" placeholder="Fiyat ₺" required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          /><br />

          <input type="number" placeholder="Toplam Koltuk" required
            value={formData.seats_total}
            onChange={(e) => setFormData({
              ...formData,
              seats_total: e.target.value,
              seats_available: e.target.value
            })}
          /><br />

          <button type="submit">{isEditing ? "Uçuşu Güncelle" : "Uçuşu Kaydet"}</button>
        </form>
      )}

      <table border="1" cellPadding="8" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kalkış</th>
            <th>Varış</th>
            <th>Kalkış Saati</th>
            <th>Varış Saati</th>
            <th>Fiyat</th>
            <th>Koltuk</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight._id}>
              <td>{flight.flight_id}</td>
              <td>{flight.from_city}</td>
              <td>{flight.to_city}</td>
              <td>{new Date(flight.departure_time).toLocaleString()}</td>
              <td>{new Date(flight.arrival_time).toLocaleString()}</td>
              <td>{flight.price} ₺</td>
              <td>{flight.seats_available}/{flight.seats_total}</td>
              <td>
                <button onClick={() => handleEdit(flight)}>Düzenle</button>{' '}
                <button onClick={() => handleDelete(flight._id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
