import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import "../css/Login.css"

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/Login', formData);
      console.log(response.data); // handle successful response
      localStorage.setItem('authToken', response.data.token);
      console.log(localStorage.getItem("authToken"));
      localStorage.setItem('Useremail', response.data.email);
      // Optionally, you can also store user data in localStorage
      // localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/');

    } catch (error) {
      console.error('Error:', error.message); // handle error
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        alert(errorMessage); // Show the error message in an alert
      } else {
        alert('server canot validate the credentials'); // Show a generic error message
      }
    }
  };
  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', }}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/Signup" className='m-3 btn btn-danger'><b>New User</b></Link>
      </form>
    </div>

  )
}








