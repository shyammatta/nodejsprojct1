// client/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
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
  };

  return (
    <div style={styles.container}>
    logo
    <table style={styles.table}>
      <thead style={styles.thead}>
        <tr style={styles.navbar} >
          <td colSpan='1' style={styles.th}></td>
          <td onClick={() => navigate('/dashboard')} style={styles.th}>Home</td>
          <td colSpan='2'onClick={() => navigate('/employee-list')} style={styles.th}>Employee List</td>
          <td>{username}</td>
          <td onClick={() => handleLogout()} style={styles.th}>Logout</td>


        </tr>

        <tr style={styles.emps}>
          
          <td style={styles.td} colspan='6'>Dashboard</td>
        </tr>
        </thead><tbody>    
          <tr >
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
                    </tr> 
            <tr >
            <td style={styles.td}></td>

            <td colspan='4'style={styles.panel}>Welcome Admin panel</td>
            <td style={styles.td}></td>

            </tr> 
            <tr >
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            


            </tr>           
            <tr >
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
                      </tr>          
             <tr >
             <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
                      </tr> 
            <tr >
             <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
                     </tr> 
      </tbody>

    </table>
    </div>
  );
}

const styles = {
  
  emps:{
    backgroundColor:'yellow',
    border:'1px solid black',
    borderCollapse:'collapse'
  },
  navbar: {
    backgroundColor: 'skyblue',
    
  },
  
  // td: {
    
  //   cursor: 'pointer',
  //   padding:'3px',
  // },

  panel:{
    textAlign:'center',
    padding:'5px'
  },
  
  dashboard: {
    fontSize: '20px',
    backgroundColor: 'yellow',
    padding: '5px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid black', // Add border to the table
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
  td: {
    borderCollapse: 'collapse',
    border: '1px solid black',
    padding: '5px', // Add padding to make data more readable
     // Center the data in the cells
    width:'200px',
    height:'15px'
  },
  
  
  
  
};

export default Dashboard;
