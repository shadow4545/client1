import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';




function Manager() {
  const [sinhviens, setSinhviens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchSinhviens = async () => {
      try {
        const response = await axios.get('https://server-inyq.onrender.com/api/sinhvien');
        setSinhviens(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sinh viên:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSinhviens();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này không?')) {
      try {
        await axios.delete(`https://server-inyq.onrender.com/api/sinhvien/${id}`);
        setSinhviens(sinhviens.filter(sv => sv._id !== id));
        alert('Đã xóa thành công!');
      } catch (error) {
        alert('Xóa thất bại!');
      }
    }
  };

  const filteredSV = sinhviens.filter(sv =>
    sv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sv.laoname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sv.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={styles.loading}>Đang tải dữ liệu...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}> Data SinhVien Lao BachKhoa </h1>

      <div style={styles.topBar}>
        <Link to="/add-sinhvien" style={styles.addBtn}>➕ Thêm sinh viên</Link>
        <input
          type="text"
          placeholder="🔍 Tìm theo tên, tên Lào, lớp"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>STT</th>
            <th style={styles.th}>Avatar</th>
            <th style={styles.th}>Họ tên</th>
            <th style={styles.th}>Tên Lào</th>
            <th style={styles.th}>Lớp</th>
            <th style={styles.th}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredSV.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>Không tìm thấy sinh viên nào.</td></tr>
          ) : (
            filteredSV.map((sv, index) => (
              <tr key={sv._id} style={styles.row}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>


                {sv.avatar ? (
                <Link to={`/detail/${sv._id}`}>
                <img
                src={`https://server-inyq.onrender.com/${sv.avatar.replace(/\\/g, '/')}`}
                alt={sv.name}
                style={styles.avatar}
                />
                </Link>
                ) : (
                <Link to={`/detail/${sv._id}`} style={{ textDecoration: 'none' }}>
                <div style={styles.avatarFallback}>N/A</div>
                </Link>
                )}


                </td>
                <td style={styles.td}>{sv.name}</td>
                <td style={styles.td}>{sv.laoname}</td>
                <td style={styles.td}>{sv.class}</td>
                <td style={styles.td}>
                  <Link to={`/edit/${sv._id}`} style={styles.editBtn}>Sửa</Link>
                  <button onClick={() => handleDelete(sv._id)} style={styles.deleteBtn}>Xóa</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    fontFamily: '"Segoe UI", sans-serif',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#2c3e50',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  addBtn: {
    padding: '10px 20px',
    backgroundColor: '#27ae60',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 600
  },
  searchInput: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minWidth: '250px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  th: {
    padding: '12px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    textAlign: 'left'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    color: '#333',
    verticalAlign: 'middle'
  },
  row: {
    transition: 'background 0.3s',
  },
  avatar: {
    width: '65px',
    height: '65px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 0 3px rgba(0,0,0,0.1)'
  },
  avatarFallback: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '12px'
  },
  editBtn: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '6px 12px',
    marginRight: '6px',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none'
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#777'
  }
};

export default Manager;
