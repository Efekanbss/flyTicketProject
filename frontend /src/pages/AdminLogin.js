import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/admin/login', {
        username,
        password
      });

      if (response.data.message === 'Giriş başarılı') {
        // Giriş durumu kaydediliyor
        localStorage.setItem('isAdminLoggedIn', 'true');
        alert('Giriş başarılı!');
        navigate('/admin/panel');
      } else {
        alert('Giriş başarısız!');
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      alert('Giriş başarısız.');
    }
  };

  return (
    <div className="container">
      <h2>Admin Giriş</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}

export default AdminLogin;
