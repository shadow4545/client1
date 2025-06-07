import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (username === 'admin1' && password === '123456') {
        navigate('/manager');
      } else {
        setError('Sai tài khoản hoặc mật khẩu');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #6a11cb, #2575fc)'
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '400px',
        position: 'relative'
      }}>
        <img
          src="https://dut.udn.vn/Files/admin/images/Tin_tuc/Khac/2020/LogoDUT/image002.jpg"
          alt="Logo DUT"
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '80px',
            height: '80px',
            borderRadius: '12px',
            backgroundColor: '#fff',
            objectFit: 'cover',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
        />
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              display: 'block',
              marginBottom: '1rem',
              padding: '0.75rem',
              width: '94%',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              display: 'block',
              marginBottom: '1rem',
              padding: '0.75rem',
              width: '94%',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem',
              width: '100%',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: '#2575fc',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Index;
