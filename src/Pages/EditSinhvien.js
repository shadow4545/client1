import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Component này sẽ tự lấy dữ liệu và tự cập nhật
function EditSinhvien() {
    const { id } = useParams(); // Lấy ID của sinh viên từ URL
    const navigate = useNavigate();

    // State để lưu toàn bộ dữ liệu form
    const [formData, setFormData] = useState({
        name: '',
        laoname: '',
        mssv: '',
        class: '',
        major: '',
        sex: '',
        birthday: '',
        education: '',
        phonenumber: '',
        link: '',
        hobbies: [],
        from: '',
        numpassport: ''
    });

    const [avatarFile, setAvatarFile] = useState(null); // State riêng cho file ảnh mới
    const [avatarPreview, setAvatarPreview] = useState(null); // State cho ảnh xem trước
    const [loading, setLoading] = useState(true);

    // 1. Dùng useEffect để lấy thông tin chi tiết của sinh viên cần sửa
    useEffect(() => {
        const fetchSinhVien = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/sinhvien/${id}`);
                const sv = response.data;
                
                // Chuyển định dạng ngày tháng để input type="date" có thể hiển thị
                const formattedBirthday = sv.birthday ? new Date(sv.birthday).toISOString().split('T')[0] : '';

                // Cập nhật state với dữ liệu lấy về
                setFormData({ ...sv, birthday: formattedBirthday, class: sv.class || '' });
                
                // Hiển thị ảnh cũ (nếu có)
                if (sv.avatar) {
                    setAvatarPreview(`http://localhost:5000/${sv.avatar.replace(/\\/g, '/')}`);
                }
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin sinh viên:", error);
                alert("Không thể tải dữ liệu sinh viên!");
                setLoading(false);
            }
        };

        fetchSinhVien();
    }, [id]); // Phụ thuộc vào `id`

    // Hàm xử lý khi thay đổi các input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        // Dùng `let` để có thể gán lại giá trị
        let currentHobbies = formData.hobbies || [];
        if (checked) {
            currentHobbies = [...currentHobbies, value];
        } else {
            currentHobbies = currentHobbies.filter((item) => item !== value);
        }
        setFormData({ ...formData, hobbies: currentHobbies });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file); // Lưu file thật để upload
            setAvatarPreview(URL.createObjectURL(file)); // Tạo ảnh xem trước tạm thời
        }
    };

    // 2. Hàm handleSubmit đã được sửa để gọi API
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ THÊM BƯỚC KIỂM TRA DỮ LIỆU
        if (!formData.name || !formData.mssv || !formData.class) {
             alert('Vui lòng điền đầy đủ các thông tin bắt buộc (Tên, MSSV, Lớp)!');
             return;
        }

        // Gom dữ liệu vào FormData để có thể gửi cả file
        const dataToSubmit = new FormData();
        // Chú ý: chúng ta gửi object formData đã được cập nhật
        dataToSubmit.append('data', JSON.stringify(formData));

        // Nếu người dùng chọn ảnh mới thì thêm vào
        if (avatarFile) {
            dataToSubmit.append('avatar', avatarFile);
        }

        try {
            // Gửi yêu cầu PUT lên server
            await axios.put(`http://localhost:5000/api/sinhvien/${id}`, dataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Cập nhật sinh viên thành công!');
            navigate('/manager'); // Chuyển về trang quản lý
        } catch (error) {
            console.error('Lỗi khi cập nhật sinh viên:', error);
            // Hiển thị lỗi cụ thể hơn từ server (nếu có)
            const errorMessage = error.response?.data?.message || 'Cập nhật thất bại!';
            alert(errorMessage);
        }
    };

    if (loading) {
        return <div style={{textAlign: 'center', marginTop: '50px'}}>Đang tải...</div>;
    }

    // Giao diện (JSX) đã được sửa để hoạt động với state mới
    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2 style={titleStyle}>✏️ Chỉnh sửa sinh viên</h2>

                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                    {avatarPreview && <img src={avatarPreview} alt="Avatar" style={avatarStyle} />}
                    <br />
                    <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>

                <fieldset style={groupStyle}>
                    <legend style={legendStyle}>Thông tin cá nhân</legend>
                    <Input name="name" label="Tên" value={formData.name} onChange={handleChange} />
                    <Input name="laoname" label="Tên Lào" value={formData.laoname} onChange={handleChange} />
                    <Input name="mssv" label="MSSV" value={formData.mssv} onChange={handleChange} />
                    <Input name="class" label="Lớp" value={formData.class} onChange={handleChange} />
                    <Input name="numpassport" label="Passport" value={formData.numpassport} onChange={handleChange} />
                    <Select name="major" label="Ngành học" value={formData.major} onChange={handleChange} options={['Công nghệ thông tin', 'Kiến trúc', 'Kỹ thuật ô tô',
            'Kỹ thuật điện', 'Cầu đường giao thông', 'Xây dựng cầu đường',
            'Công nghệ thực phẩm', 'Công nghệ chế tạo máy' , 'Cơ khí giao thông ']} />
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label style={labelStyle}>Giới tính:</label><br />
                        <label><input type="radio" name="sex" value="Nam" checked={formData.sex === 'Nam'} onChange={handleChange} /> Nam</label>
                        <label style={{ marginLeft: '20px' }}><input type="radio" name="sex" value="Nữ" checked={formData.sex === 'Nữ'} onChange={handleChange} /> Nữ</label>
                    </div>

                    <Input name="birthday" label="Ngày sinh" type="date" value={formData.birthday} onChange={handleChange} />
                    <Select name="from" label="Tỉnh" value={formData.from} onChange={handleChange} options={[ 'SAVANNAKHET', 'VENGCHAN', 'SALAVAN',
            'ATTAPUE', 'BOLIKHUMXAY', 'CHAMPASAK',
            'SEKONG', 'KHUMMUON', 'VIENTAIN', 'LUONGPABANG',]} />
                </fieldset>
                
                <fieldset style={groupStyle}>
                    <legend style={legendStyle}>Liên hệ & Khác</legend>
                    <Select name="education" label="Trình độ học vấn" value={formData.education} onChange={handleChange} options={['Đại học', 'Thạc sĩ', 'Tiến sĩ']} />
                    <Input name="phonenumber" label="Số điện thoại" type="number" value={formData.phonenumber} onChange={handleChange} />
                    <Input name="link" label="Liên kết" type="url" value={formData.link} onChange={handleChange} />
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Hội nhóm:</label><br />
                        {['ຊາວຫນຸ່ມ', 'ກຳມະບານ', 'ຊະມາຊີກພັກ', 'ເເມ່ຍິງ'].map(hobby => (
                            <label key={hobby} style={{ display: 'block', marginBottom: '5px' }}>
                                <input type="checkbox" value={hobby} checked={formData.hobbies?.includes(hobby)} onChange={handleCheckboxChange} /> {hobby}
                            </label>
                        ))}
                    </div>
                </fieldset>

                <button type="submit" style={buttonStyle}>Cập nhật</button>
            </form>
        </div>
    );
}

// --- Các component con và style không đổi ---
const Input = ({ name, label, ...rest }) => (
    <div style={{ marginBottom: '15px' }}>
        <label style={labelStyle}>{label}:</label><br />
        <input name={name} {...rest} style={inputStyle} />
    </div>
);
const Select = ({ name, label, options, ...rest }) => (
    <div style={{ marginBottom: '15px' }}>
        <label style={labelStyle}>{label}:</label><br />
        <select name={name} {...rest} style={inputStyle}>
            <option value="">-- Chọn {label.toLowerCase()} --</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);
const containerStyle = { display: 'flex', justifyContent: 'center', padding: '40px', backgroundColor: '#f0f2f5' };
const formStyle = { backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '700px' };
const titleStyle = { textAlign: 'center', marginBottom: '20px' };
const labelStyle = { fontWeight: 'bold', display: 'block', color: '#444', marginBottom: '5px' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '5px' };
const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' };
const groupStyle = { marginBottom: '25px', border: '1px solid #ddd', borderRadius: '8px', padding: '15px' };
const legendStyle = { fontWeight: 'bold', fontSize: '16px' };
const avatarStyle = { width: '120px', height: '120px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #ccc', marginBottom: '10px' };

export default EditSinhvien;

