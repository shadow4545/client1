import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFacebookSquare } from 'react-icons/fa';

function DetailSinhvien({ sinhvien = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const sv = sinhvien[parseInt(id)];

  if (!sv) return <p>Sinh viên không tồn tại.</p>;

  return (
    <div style={styles.wrapper}>
      {/* Fullscreen Cover Avatar */}
      <div style={styles.coverContainer}>
        <img
          src={sv.avatar || 'https://via.placeholder.com/400'}
          alt="avatar"
          style={styles.coverImage}
        />
      </div>

      {/* Thông tin trượt lên */}
      <div style={styles.infoContainer}>
        <h2 style={styles.name}>{sv.name}</h2>
        <p style={styles.laoname}>🎓 Tên Lào: <strong>{sv.laoname || 'Chưa cập nhật'}</strong></p>

        <div style={styles.grid}>
          <div><strong>MSSV:</strong></div>
          <div>{sv.mssv}</div>

          <div><strong>Lớp:</strong></div>
          <div>{sv.class}</div>

          <div><strong>Ngành:</strong></div>
          <div>{sv.major}</div>

          <div><strong>Giới tính:</strong></div>
          <div>{sv.sex}</div>

          <div><strong>Ngày sinh:</strong></div>
          <div>{sv.birthday}</div>

          <div><strong>Trình độ:</strong></div>
          <div>{sv.education}</div>

          <div><strong>SĐT:</strong></div>
          <div>{sv.phonenumber}</div>
        </div>

        {/* Facebook link */}
        {sv.link && (
          <a href={sv.link} target="_blank" rel="noreferrer" style={styles.fbLink}>
            <FaFacebookSquare size={22} style={{ marginRight: 8 }} />
            Kết nối Facebook
          </a>
        )}

        {/* Hobbies */}
        {sv.hobbies?.length > 0 && (
          <div style={styles.tags}>
            {sv.hobbies.map((tag, i) => (
              <span key={i} style={styles.tag}>{tag}</span>
            ))}
          </div>
        )}

        <button style={styles.backBtn} onClick={() => navigate(-1)}>⬅ Quay lại</button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    overflowY: 'auto',
  },
  coverContainer: {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: '30px',
    borderTopRightRadius: '30px',
    marginTop: '-30px',
    padding: '25px',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
    animation: 'slideUp 0.6s ease',
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '5px',
    textAlign: 'center'
  },
  laoname: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: '20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '10px 15px',
    fontSize: '15px',
    marginBottom: '20px'
  },
  fbLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1877F2',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '500',
    marginBottom: '20px',
    width: '100%'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  tag: {
    backgroundColor: '#5a67d8',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '15px',
    fontSize: '13px'
  },
  backBtn: {
    backgroundColor: '#6b46c1',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    cursor: 'pointer',
    width: '100%'
  }
};

// Keyframe effect (you can move to CSS file if needed)
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes slideUp {
  0% { transform: translateY(100px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
`, styleSheet.cssRules.length);

export default DetailSinhvien;
