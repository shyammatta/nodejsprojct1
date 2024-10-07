// client/src/components/EditEmployee.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {
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
    // Retrieve username from local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/'); // Redirect to login if no username found
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove username from local storage on logout
    localStorage.removeItem('username');
    navigate('/');
  };  const { id } = useParams(); // Get the employee ID from the URL

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`/api/employees/${id}`);
        const employee = response.data;

        // Populate form data
        setFormData({
          name: employee.name,
          email: employee.email,
          mobile: employee.mobile,
          designation: employee.designation,
          gender: employee.gender,
          courses: employee.courses || [],
          image: null, // Keep this null initially
        });
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData((prevState) => ({
          ...prevState,
          courses: [...prevState.courses, value],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          courses: prevState.courses.filter((course) => course !== value),
        }));
      }
    } else if (type === 'radio') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email');
      return;
    }

    if (
      formData.image &&
      !['image/jpeg', 'image/jpg', 'image/png'].includes(formData.image.type)
    ) {
      alert('Only JPG and PNG images are allowed');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('mobile', formData.mobile);
    data.append('designation', formData.designation);
    data.append('gender', formData.gender);
    formData.courses.forEach((course) => data.append('courses', course));
    if (formData.image) data.append('image', formData.image);

    try {
      await axios.put(`/api/employees/edit/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Employee updated successfully');
      navigate('/employee-list');
    } catch (error) {
      console.error(error);
      alert('Error updating employee');
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
  <td style={styles.td} colspan='6'>Edit Employee</td>
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
    <option value="Developer">Developer</option>
    <option value="Manager">Manager</option>
    <option value="Designer">Designer</option>
    <option value="QA">QA</option>
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
        value="React" 
        onChange={handleChange} 
      /> React
    </label>
    <label>
      <input 
        type="checkbox" 
        name="courses" 
        value="Node.js" 
        onChange={handleChange} 
      /> Node.js
    </label>
    <label>
      <input 
        type="checkbox" 
        name="courses" 
        value="MongoDB" 
        onChange={handleChange} 
      /> MongoDB
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
export default EditEmployee;
