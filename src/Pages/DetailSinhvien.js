import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DetailSinhvien() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sv, setSv] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSinhvien = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/sinhvien/${id}`);
        setSv(res.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sinh viên:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSinhvien();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Chưa cập nhật';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
  };

  if (loading) return <p style={{ textAlign: 'center', padding: 40 }}>Đang tải dữ liệu...</p>;
  if (!sv) return <p style={{ textAlign: 'center', padding: 40 }}>Không tìm thấy sinh viên.</p>;

  return (
    <div style={styles.page}>
      <div style={styles.cardWrapper}>
        <div style={styles.topBar}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>⬅ Quay lại</button>
          <button
            onClick={() => navigate(`/edit/${sv._id}`)}
            style={styles.editBtn}
          >
            ✏️ Chỉnh sửa
          </button>
        </div>

        <div style={styles.card}>
          <div style={styles.avatarContainer}>
            <img
              src={sv.avatar ? `http://localhost:5000/${sv.avatar.replace(/\\/g, '/')}` : 'https://via.placeholder.com/150'}
              alt="avatar"
              style={styles.avatar}
            />
          </div>
          <h3 style={styles.name}>{sv.name}</h3>
          <div style={styles.info}>
            <div style={styles.field}><strong>Tên Lào:</strong> {sv.laoname}</div>
            <div style={styles.field}><strong>MSSV:</strong> {sv.mssv}</div>
            <div style={styles.field}><strong>Lớp:</strong> {sv.class}</div>
            <div style={styles.field}><strong>Ngành:</strong> {sv.major}</div>
            <div style={styles.field}><strong>Giới tính:</strong> {sv.sex}</div>
            <div style={styles.field}><strong>Ngày sinh:</strong> {formatDate(sv.birthday)}</div>
            <div style={styles.field}><strong>Tỉnh:</strong> {sv.from}</div>
            <div style={styles.field}><strong>Trình độ:</strong> {sv.education}</div>
            <div style={styles.field}><strong>SĐT:</strong> {sv.phonenumber}</div>
            <div style={styles.field}><strong>Link:</strong> <a href={sv.link} target="_blank" rel="noreferrer">{sv.link}</a></div>
            <div style={styles.field}><strong>Hội nhóm:</strong> {Array.isArray(sv.hobbies) ? sv.hobbies.join(', ') : ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    padding: '40px',
    fontFamily: '"Segoe UI", sans-serif',
  },
  cardWrapper: {
    width: '100%',
    maxWidth: '700px',
    backgroundColor: '#eaf4fc',
    borderRadius: '14px',
    padding: '30px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  backBtn: {
    padding: '10px 18px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500
  },
  editBtn: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500
  },
  card: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatarContainer: {
    marginBottom: '20px'
  },
  avatar: {
    width: '160px',
    height: '160px',
    borderRadius: '12px',
    objectFit: 'cover',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  name: {
    fontSize: '24px',
    color: '#000000',
    marginBottom: '20px',
    fontWeight: 700
  },
  info: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    fontSize: '16px',
    fontWeight: 500,
  },
  field: {
    backgroundColor: '#d9ecff',
    color: '#1a3c60',
    padding: '10px 14px',
    borderRadius: '8px',
    textAlign: 'left',
    boxShadow: 'inset 0 0 4px rgba(0,0,0,0.05)'
  }
};

export default DetailSinhvien;
