// client/src/components/CreateEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: null,
  });
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/'); // Redirect to login if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prevState => ({
          ...prevState,
          courses: [...prevState.courses, value]
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          courses: prevState.courses.filter(course => course !== value)
        }));
      }
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({ ...prevState, image: e.target.files[0] }));
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email');
      return;
    }

    if (formData.image && !['image/jpeg', 'image/jpg', 'image/png'].includes(formData.image.type)) {
      alert('Only JPG and PNG images are allowed');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'courses') {
        formData[key].forEach(course => data.append('courses', course));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.post('/api/employees/create', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Employee created successfully');
      navigate('/employee-list');
    } catch (error) {
      alert('Error creating employee');
    }
  };

  return (
    <div style={styles.container}>
     logo
    

    <form onSubmit={handleSubmit} style={styles.form}>

<table style={styles.table}>
<thead style={styles.thead}>
<tr style={styles.navbar} >
  <td colSpan='1' style={styles.th}></td>
  <td colSpan='1'onClick={() => navigate('/dashboard')} style={styles.navlinks}>Home</td>
  <td colSpan='7'onClick={() => navigate('/employee-list')} style={styles.navlinks}>Employee List</td>
  <td>{username}</td>
  <td onClick={() => handleLogout()}  style={styles.navlinks}>Logout</td>


</tr>

<tr style={styles.emps}>
  <td style={styles.td} colspan='6'>Create Employee</td>
  <td colspan='5'></td>
</tr>



</thead>
<tbody>
<tr>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}>Name</td>
  <td style={styles.inputs}><input 
    type="text" 
    name="name" 
    placeholder="Name" 
    value={formData.name} 
    onChange={handleChange} 
    required 
    style={styles.input}
  /></td>
          <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}>Email</td>
  <td style={styles.inputs}><input 
    type="email" 
    name="email" 
    placeholder="Email" 
    value={formData.email} 
    onChange={handleChange} 
    required 
    style={styles.input}
  /></td>
          <td style={styles.td}></td>
          <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}>Mobile No</td>
  <td style={styles.inputs   }>     <input 
    type="text" 
    name="mobile" 
    placeholder="Mobile Number" 
    value={formData.mobile} 
    onChange={handleChange} 
    style={styles.input}
  /></td>
          <td style={styles.td}></td>
          <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>

  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}>Designation</td>
  <td style={styles.inputs}>        <select 
    name="designation" 
    value={formData.designation} 
    onChange={handleChange} 
    required 
    style={styles.input}
  >
    <option value="">Select Designation</option>
    <option value="HR">HR</option>
    <option value="Manager">Manager</option>
    <option value="Sales">Sales</option>
  </select></td>
          <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}>Gender</td>
  <td  style={styles.inputs}><div style={styles.radioContainer}>
    <label>
      <input 
        type="radio" 
        name="gender" 
        value="Male" 
        checked={formData.gender === 'Male'} 
        onChange={handleChange} 
        required 
      /> Male
    </label>
    <label>
      <input 
        type="radio" 
        name="gender" 
        value="Female" 
        checked={formData.gender === 'Female'} 
        onChange={handleChange} 
        required 
      /> Female
    </label>
  </div></td>
          <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}>Course</td>
  <td  style={styles.inputs}><div style={styles.checkboxContainer}>
    <label>
      <input 
        type="checkbox" 
        name="courses" 
        value="MCA" 
        onChange={handleChange} 
      /> MCA
    </label>
    <label>
      <input 
        type="checkbox" 
        name="courses" 
        value="BCA" 
        onChange={handleChange} 
      /> BCA
    </label>
    <label>
      <input 
        type="checkbox" 
        name="courses" 
        value="BSC" 
        onChange={handleChange} 
      /> BSC
    </label>
  </div></td>
          <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}>Img Upload</td>
  <td style={styles.inputs}><input 
    type="file" 
    name="image" 
    accept="image/jpeg, image/png" 
    onChange={handleFileChange} 
    style={styles.input}
  /></td>
          <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.button}>        <button type="submit" style={styles.loginbutt}>Submit</button>
</td>
          <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>
  <tr>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  </tr>



</tbody>
</table>
</form>
</div>
);
}

const styles = {
container: {
},
emps:{
backgroundColor:'yellow',
border:'1px solid black',
borderCollapse:'collapse'
},
navbar: {
backgroundColor: 'skyblue',

},
user: {
marginLeft: '550px',
},
navlinks: {

cursor: 'pointer',
padding:'3px'
},



dashboard: {
fontSize: '20px',
backgroundColor: 'yellow',
padding: '5px',
},
table: {
width: '100%',
borderCollapse: 'collapse',
border: '2px solid black', // Add border to the table
},

empty:{
width:'100px'
},

thead: {
borderBottom: '1px solid black', // Add border below the header
},
tr: {
borderBottom: '1px solid black', // Add border to table rows
},
th: {
backgroundColor: 'skyblue',
width:'200px',
textAlign: 'left',
cursor:'pointer'

// borderCollapse: 'collapse',
// border: '1px solid black', // Add border to table rows
},
td:{
border:'0.2px solid rgb(195, 228, 241)',
borderCollapse:'collapse',
width:'100px',
height:'30px'


},
inputs:{
border:'2px solid black',
width:'300px'



},

input: { 

border:'none',
width:'99%',
height:'25px',
outline:'none',
fontSize:'16px'


},
button:{
background:'green'
},
loginbutt:{
background:'none',
paddingLeft: '0px', 
fontSize: '18px', 
cursor: 'pointer' ,
border:'none',
color:'white',
width:'100%',
height:'100%',
fontFamily: 'Arial, Helvetica, sans-serif'
},




};

export default CreateEmployee;
