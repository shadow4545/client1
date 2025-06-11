import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function AddSinhvien({ onAdd }) {
  const [name, setName] = useState('');
  const [laoname, setLaoName] = useState('');
  const [mssv, setMssv] = useState('');
  const [className, setClassName] = useState('');
  const [major, setMajor] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState('');
  const [education, setEducation] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [link, setLink] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const [from, setFrom] = useState('');
  const [numpassport, setNumPassport] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setHobbies([...hobbies, value]);
    } else {
      setHobbies(hobbies.filter((item) => item !== value));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };





 const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !name || !laoname || !mssv || !className ||
    !major || !sex || !birthday || !education ||
    !phonenumber || !link || !from || !numpassport
  ) {
    alert('Vui lòng điền đầy đủ thông tin!');
    return;
  }

  const sinhvienData = {
    name,
    laoname,
    mssv,
    class: className,
    major,
    sex,
    birthday,
    education,
    phonenumber,
    link,
    hobbies,
    from,
    numpassport
  };

  const formData = new FormData();
  formData.append('data', JSON.stringify(sinhvienData));
  if (avatar) {
    formData.append('avatar', avatar);
  }

  try {
    await axios.post('https://server-inyq.onrender.com/api/sinhvien', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    alert('✅ Thêm sinh viên thành công!');
    navigate('/manager');
  } catch (err) {
    console.error('❌ Lỗi khi gửi dữ liệu:', err);
    alert('❌ Có lỗi xảy ra !');
  }
};








  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>➕ Thêm sinh viên</h2>

        <Input label="Tên" value={name} onChange={setName} />
        <Input label="Tên Lào" value={laoname} onChange={setLaoName} />
        <Input label="MSSV" value={mssv} onChange={setMssv} />
        <Input label="Lớp" value={className} onChange={setClassName} />
        <Input label="Passport" value={numpassport} onChange={setNumPassport} />

        <Select
          label="Ngành học"
          value={major}
          onChange={setMajor}
          options={[
            'Công nghệ thông tin', 'Kiến trúc', 'Kỹ thuật ô tô',
            'Kỹ thuật điện', 'Cầu đường giao thông', 'Xây dựng cầu đường',
            'Công nghệ thực phẩm', 'Công nghệ chế tạo máy' , 'Cơ khí giao thông '
          ]}
        />

        <div style={rowStyle}>
          <label style={labelRowStyle}>Giới tính:</label>
          <div>
            <label><input type="radio" value="Nam" checked={sex === 'Nam'} onChange={(e) => setSex(e.target.value)} /> Nam</label>
            <label style={{ marginLeft: '20px' }}><input type="radio" value="Nữ" checked={sex === 'Nữ'} onChange={(e) => setSex(e.target.value)} /> Nữ</label>
          </div>
        </div>

        <div style={rowStyle}>
          <label style={labelRowStyle}>Ngày sinh:</label>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} style={inputRowStyle} />
        </div>

        <Select
          label="Tỉnh"
          value={from}
          onChange={setFrom}
          options={[
            'SAVANNAKHET', 'VENGCHAN', 'SALAVAN',
            'ATTAPUE', 'BOLIKHUMXAY', 'CHAMPASAK',
            'SEKONG', 'KHUMMUON', 'VIENTAIN', 'LUONGPABANG',
          ]}
        />

        <Select
          label="Trình độ học vấn"
          value={education}
          onChange={setEducation}
          options={['Đại học', 'Thạc sĩ', 'Tiến sĩ']}
        />

        <Input label="Số điện thoại" type="number" value={phonenumber} onChange={setPhonenumber} />
        <Input label="Liên kết" type="url" placeholder="https://example.com" value={link} onChange={setLink} />

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>ອົງການຈັດຕັ້ງ:</label><br />
          {['ຊາວຫນຸ່ມ', 'ກຳມະບານ', 'ຊະມາຊີກພັກ','ເເມ່ຍິງ'].map((hobby) => (
            <div key={hobby}>
              <label>
                <input
                  type="checkbox"
                  value={hobby}
                  checked={hobbies.includes(hobby)}
                  onChange={handleCheckboxChange}
                /> {hobby}
              </label>
            </div>
          ))}
        </div>

        {/* Avatar */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <label style={labelStyle}>Ảnh đại diện (Avatar):</label><br />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '10px',
                border: '2px solid #ccc'
              }}
            />
          )}<br />
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>

        <button type="submit" style={buttonStyle}>Lưu</button>
      </form>
    </div>
  );
}

// ✅ Input component với label và input nằm trên cùng hàng
const Input = ({ label, value, onChange, type = 'text', placeholder = '' }) => (
  <div style={rowStyle}>
    <label style={labelRowStyle}>{label}:</label>
    <input
      type={type}
      placeholder={placeholder || label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={inputRowStyle}
    />
  </div>
);

// ✅ Select component cũng dùng chung style
const Select = ({ label, value, onChange, options }) => (
  <div style={rowStyle}>
    <label style={labelRowStyle}>{label}:</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} style={inputRowStyle}>
      <option value="">-- Chọn {label.toLowerCase()} --</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

// 🎨 CSS-in-JS style
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f2f4f8',
  padding: '40px'
};

const formStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '700px'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#333'
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '15px',
};

const labelRowStyle = {
  fontWeight: 'bold',
  color: '#555',
  minWidth: '120px',
  marginRight: '10px'
};

const inputRowStyle = {
  flex: 1,
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: '5px',
  display: 'block',
  color: '#555'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px'
};

export default AddSinhvien;
