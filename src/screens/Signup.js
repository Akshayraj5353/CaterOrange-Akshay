import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import "../css/Signup.css"

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        PhoneNumber: '',
        companyName: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


   const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/Register', formData);
            console.log(response.data); // handle successful response
            // Redirect or show a success message to the user
        } catch (error) {
            console.error('Error:', error.message); // handle error
            if (error.response && error.response.data && error.response.data.error) {
                const errorMessage = error.response.data.error;
                alert(errorMessage); // Show the error message in an alert
            } else {
                alert('An error occurred. Please try again.'); // Show a generic error message
            }
        }
    };
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">UserName</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={formData.email} onChange={handleChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="PhoneNumber" className="form-label">Phone Number</label>
                    <input type="Number" className="form-control" id="PhoneNumber" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="companyName" className="form-label">Company Name</label>
                    <input type="text" className="form-control" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/Login" className='m-3 btn btn-danger'><b>Already a user</b></Link>
            </form>
        </div>
    )
}
