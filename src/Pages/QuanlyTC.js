import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Manager({ sinhvien = [] }) {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sinhVienList, setSinhVienList] = useState(sinhvien);

  const handleNavigate = useCallback(() => {
    navigate('/add-sinhvien');
  }, [navigate]);

  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xoá sinh viên này không?');
    if (confirmDelete) {
      const updatedList = [...sinhVienList];
      updatedList.splice(index, 1);
      setSinhVienList(updatedList);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getButtonStyle = () => {
    let backgroundColor = '#1b5e20';
    if (isClick) backgroundColor = '#2e7d32';
    else if (isHover) backgroundColor = '#388e3c';

    return {
      padding: '12px 24px',
      backgroundColor,
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 600,
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      transform: isHover ? 'translateY(-2px)' : 'translateY(0)',
      marginBottom: '16px',
      width: '100%',
      maxWidth: '250px'
    };
  };

  const filteredSV = sinhVienList.filter(sv =>
    sv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sv.mssv.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sv.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define theme colors
  const theme = {
    background: darkMode ? '#121212' : '#ffffff',
    text: darkMode ? '#eeeeee' : '#1b5e20',
    card: darkMode ? '#1e1e1e' : '#e8f5e9',
    border: darkMode ? '#333' : '#ccc',
    hoverCard: darkMode ? '#333' : '#ffffff'
  };

  return (
    <div style={{ backgroundColor: theme.background, color: theme.text, minHeight: '100vh' }}>
      {/* Sidebar nav */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '200px',
        backgroundColor: theme.card,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)'
      }}>
        <Link to="/manager" style={{ textDecoration: 'none', color: theme.text, fontWeight: 'bold' }}>Danh sach SV</Link>
        <Link to="/Activity" style={{ textDecoration: 'none', color: theme.text, fontWeight: 'bold' }}>📋 Quản lý tai chinh </Link>
        <Link to="/add-sinhvien" style={{ textDecoration: 'none', color: theme.text, fontWeight: 'bold' }}>➕ Thêm sinh viên</Link>

        {/* Toggle Dark Mode */}
        <button
          onClick={toggleDarkMode}
          style={{
            marginTop: 'auto',
            padding: '10px',
            borderRadius: '6px',
            backgroundColor: darkMode ? '#555' : '#a5d6a7',
            color: darkMode ? '#fff' : '#1b5e20',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {darkMode ? '🌙 Tắt Dark Mode' : '🌞 Bật Dark Mode'}
        </button>
      </nav>

      {/* Main content */}
      <div style={{ padding: '20px', marginLeft: '220px' }}>
        <h2 style={{ color: theme.text, textAlign: 'center' }}>👨‍🎓 Quản lý sinh viên</h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <button
            onClick={handleNavigate}
            style={getButtonStyle()}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => {
              setIsHover(false);
              setIsClick(false);
            }}
            onMouseDown={() => setIsClick(true)}
            onMouseUp={() => setIsClick(false)}
          >
            ➕ Thêm sinh viên
          </button>

          <input
            type="text"
            placeholder="🔍 Tìm kiếm theo tên, MSSV hoặc lớp"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              width: '100%',
              maxWidth: '400px',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              fontSize: '16px',
              backgroundColor: darkMode ? '#2c2c2c' : '#fff',
              color: theme.text
            }}
          />
        </div>

        {filteredSV.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#888', textAlign: 'center' }}>Không tìm thấy sinh viên nào.</p>
        ) : (
          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: 0,
            listStyle: 'none',
            width: '100%',
            maxWidth: '100%',
          }}>
            {filteredSV.map((sv, index) => (
              <li
                key={index}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: theme.card,
                  padding: '12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  flexWrap: 'wrap'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={sv.avatar || 'https://via.placeholder.com/60'}
                  alt="avatar"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div
                  onClick={() => navigate(`/detail/${index}`)}
                  style={{ flex: 1, minWidth: '200px' }}
                >
                  <strong>{sv.name}</strong><br />
                  MSSV: {sv.mssv} - Lớp: {sv.class}
                </div>

                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    backgroundColor: '#e53935',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  🗑️ Xoá
                </button>

                {hoveredIndex === index && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    zIndex: 10,
                    background: theme.hoverCard,
                    padding: '12px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                    width: '250px',
                    marginTop: '8px',
                    color: theme.text
                  }}>
                    <img
                      src={sv.avatar || 'https://via.placeholder.com/80'}
                      alt="avatar"
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginBottom: '10px'
                      }}
                    />
                    <div><strong>Họ tên:</strong> {sv.name}</div>
                    <div><strong>MSSV:</strong> {sv.mssv}</div>
                    <div><strong>Lớp:</strong> {sv.class}</div>
                    {sv.email && <div><strong>Email:</strong> {sv.email}</div>}
                    {sv.phone && <div><strong>Phone:</strong> {sv.phone}</div>}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Manager;
