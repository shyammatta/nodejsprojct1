// client/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement actual authentication logic here (e.g., JWT)
    if (username === 'admin' && password === 'password') {
      // Store user info/token if necessary
      localStorage.setItem('username', username);

      navigate('/dashboard');
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>

<table style={styles.table}>
  <thead style={styles.thead}>

<tr >
<th  colspan='6' style={styles.login}>Login Page</th>
</tr>
</thead>
<tbody>
        <tr style={styles.tr}>
  <td style={styles.td}></td>
  <td style={styles.labels}>User Name</td>
  <td colspan='2' style={styles.inputs}><input 
    type="text" 
    value={username} 
    onChange={(e) => setUsername(e.target.value)} 
    required 
    style={styles.input}
  /></td>
  <td colspan='2' style={styles.td}></td>
</tr>

<tr style={styles.tr}>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>

</tr>
<tr style={styles.tr}>
<td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>

</tr>
<tr style={styles.tr}>
<td style={styles.td}></td>
  <td style={styles.labels}>Password</td>
  <td colspan='2' style={styles.inputs}><input 
    type="password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    required 
    style={styles.input}
  /></td>
  <td colspan='2' style={styles.td}></td>
</tr>
<tr style={styles.tr}>
<td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>


</tr>
<tr style={styles.tr}>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td colspan='2' style={styles.button}><button  type="submit"  style={styles.loginbutt}>Login</button></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>

</tr>
<tr style={styles.tr}>
<td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>
  <td style={styles.td}></td>


</tr>
<tr style={styles.tr}>
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

table:{
  border: '2px solid black', 

    borderCollapse: 'collapse',
width:'80%',

},
login:{
  padding:'6px',
backgroundColor:'yellow',
fontSize:'20px',
textAlign:'left'

},
thead:{
  // border: '2px solid black', // Add border below the header

},
tr:{
height:'25px'
},
td:{
border:'0.2px solid rgb(195, 228, 241)',
borderCollapse:'collapse',
width:'100px',
height:'30px'


},
labels:{
  padding:'3px',
  fontWeight:'bold',
  fontSize:'17px',

},
inputs:{
  border:'2px solid black',

  

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
      


export default Login;
