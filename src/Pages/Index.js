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
    }, 800);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '3rem 2rem 2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        position: 'relative',
        transition: 'transform 0.3s ease',
        animation: 'fadeIn 0.8s ease-out'
      }}>
        <img
          src="https://dut.udn.vn/Files/admin/images/Tin_tuc/Khac/2020/LogoDUT/image002.jpg"
          alt="Logo DUT"
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '0.75rem',
            marginBottom: '1rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
          }}
        />
        <h2 style={{ marginBottom: '0.4rem', color: '#333', fontWeight: 'bold' }}>Login to SVLaoDB</h2>
        <p style={{ marginBottom: '1.5rem', color: '#777' }}>@ make and develope by Mr Vanh</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="User"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '93%',
              padding: '0.8rem',
              marginBottom: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              fontSize: '1rem',
              transition: 'all 0.3s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#764ba2'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '93%',
              padding: '0.8rem',
              marginBottom: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              fontSize: '1rem',
              transition: 'all 0.3s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#764ba2'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          {error && (
            <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: '#764ba2',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5a3e85'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#764ba2'}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Index;
