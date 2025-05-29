import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: '#f0f0f0',
      marginBottom: '2rem',
      display: 'flex',
      gap: '1rem'
    }}>
      <Link to="/">Ana Sayfa</Link>
      <Link to="/admin">Admin Giriş</Link>
      <Link to="/admin/panel">Admin Panel</Link>
    </nav>
  );
}

export default Navbar;
