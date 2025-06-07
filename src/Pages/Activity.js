import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Activity({ sinhvien = [] }) {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const theme = {
    background: darkMode ? '#121212' : '#ffffff',
    text: darkMode ? '#eeeeee' : '#1b5e20',
    card: darkMode ? '#1e1e1e' : '#e8f5e9',
    border: darkMode ? '#333' : '#ccc',
    hoverCard: darkMode ? '#333' : '#ffffff'
  };

  const filteredSV = selectedGroup
    ? sinhvien.filter(sv => sv.nhom === selectedGroup)
    : [];

  const handleCreateGroup = () => {
    alert('Tạo nhóm mới từ nhóm: ' + selectedGroup);
    // Bạn có thể thay thế đoạn alert này bằng logic lưu nhóm vào backend hoặc context nếu có
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
        <Link to="/manager" style={{ textDecoration: 'none', color: theme.text, fontWeight: 'bold' }}>📋 Danh sách SV</Link>
        <Link to="/Activity" style={{ textDecoration: 'none', color: theme.text, fontWeight: 'bold' }}>👥 Quản lý nhóm</Link>
        <Link to="/add-sinhvien" style={{ textDecoration: 'none', color: theme.text, fontWeight: 'bold' }}>➕ Thêm sinh viên</Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
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
        <h2 style={{ textAlign: 'center' }}>👥 Quản lý nhóm sinh viên</h2>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '8px',
              fontSize: '16px',
              marginRight: '10px'
            }}
          >
            <option value="">-- Chọn nhóm --</option>
            <option value="ຊາວຫນຸ່ມ">ຊາວຫນຸ່ມ</option>
            <option value="ກຳມະບານ">ກຳມະບານ</option>
            <option value="ຊະມາຊີກພັກ">ຊະມາຊີກພັກ</option>
            <option value="ເເມ່ຍິງ">ເເມ່ຍິງ</option>
          </select>

          <button
            onClick={handleCreateGroup}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            ➕ Tạo nhóm
          </button>
        </div>

        {selectedGroup && (
          <div>
            <h3>📋 Sinh viên thuộc nhóm: {selectedGroup}</h3>
            {filteredSV.length === 0 ? (
              <p>Không có sinh viên nào trong nhóm này.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {filteredSV.map((sv, index) => (
                  <li key={index} style={{
                    backgroundColor: theme.card,
                    marginBottom: '10px',
                    padding: '10px',
                    borderRadius: '8px'
                  }}>
                    <strong>{sv.name}</strong> – MSSV: {sv.mssv}, Lớp: {sv.class}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Activity;
