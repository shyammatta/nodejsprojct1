// client/src/components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchEmployees();
  }, []);

  const [username, setUsername] = useState('');

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
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees/list');
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching employees');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`/api/employees/delete/${id}`);
        setEmployees(employees.filter(emp => emp._id !== id));
      } catch (error) {
        console.error(error);
        alert('Error deleting employee');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Navigate to the edit page with the employee ID
  };

  return (
    <div style={styles.container}>
      logo
      


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
          <td style={styles.td} colspan='6'>Employee List</td>
          <td colspan='5'></td>
        </tr>

        <tr>
          <td colspan='7'></td>
          <td>Total count: {filteredEmployees.length}</td>
          <td></td>
          <td style={styles.createemp} colspan='1' onClick={() => navigate('/create-employee')}>create employee</td>
          <td></td>


        </tr>
          <tr>
            <th colSpan="7" style={styles.th}></th>
            <th style={styles.th}>Search</th>
            <th colSpan="3" style={styles.th}>
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={handleSearch}
                style={styles.search}
              />
            </th>
          </tr>
          <tr>
            <th style={styles.unqid} >Unique ID</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Mobile</th>
            <th style={styles.th}>Designation</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>Courses</th>
            <th style={styles.th}>Created At</th>
            <th colspan='2' style={styles.th}>Action</th>

          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(emp => (
            <tr key={emp._id} style={styles.tr}>
              <td style={styles.unqid}>{emp._id}</td>
              <td style={styles.td}>
                {emp.image ? (
                  <img
                    src={`/uploads/${emp.image}`}
                    alt={emp.name}
                    style={styles.image}
                  />
                ) : 'N/A'}
              </td>
              <td style={styles.td}>{emp.name}</td>
              <td style={styles.td}>{emp.email}</td>
              <td style={styles.td}>{emp.mobile}</td>
              <td style={styles.td}>{emp.designation}</td>
              <td style={styles.td}>{emp.gender}</td>
              <td style={styles.td}>{emp.courses.join(', ')}</td>
              <td style={styles.td}>{new Date(emp.createdAt).toLocaleDateString()}</td>
              <td style={styles.td}>
                <button onClick={() => handleEdit(emp._id)} style={styles.actionButton}>Edit</button>
                <button onClick={() => handleDelete(emp._id)} style={styles.actionButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  unqid:{
    width:'2px',
    textAlign:'left'
  },

  
  
  search: {
    padding: '5px',
    fontSize: '16px',
    width: '96%', // Ensures the input fits into the column properly
    border:'none',
    margin:'0'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid black', // Add border to the table
  },

  empty:{
    width:'100px'
  },
  createemp:{
    backgroundColor:'lightgreen'
  },
  action:{
    width:'250px'
  },
  thead: {
    borderBottom: '1px solid black', // Add border below the header
  },
  tr: {
    borderBottom: '1px solid black', // Add border to table rows
  },
  th: {
    backgroundColor: 'skyblue',
    width:'160px'

    // borderCollapse: 'collapse',
    // border: '1px solid black', // Add border to table rows
  },
  td: {
    border: '1px solid black', // Add border to table data
    padding: '5px', // Add padding to make data more readable
    textAlign: 'left', // Center the data in the cells
    width:'160px'
  },
  image: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  actionButton: {
    margin: '0 5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default EmployeeList;
