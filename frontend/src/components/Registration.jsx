/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import { Form, Button } from "rsuite"
import '../css/registration.css'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
export default function Registration() {
  const [formData, setformData] = useState({
    email: '',
    password: '',
    fullname: '',
    address: '',
    contactNumber: ''
  });
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setformData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
   
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Print the server response
        navigate('/home');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <div className="registration-container">
      <h1 style={{color: '#900C3F', fontFamily: 'revert-layer'}}>Create your Account</h1>
      <Form className='registration-form' onSubmit={handleSubmit}>
        <Form.Group className='email-group'>
          <Form.ControlLabel style={{color: '#313866', fontSize: '20px', fontFamily: 'sans-serif'}}>Email</Form.ControlLabel>
          <Form.Control
            name="email"
            required
            onChange={value => handleInputChange('email', value)}
          />
        </Form.Group>
        <Form.Group className='password-group'>
          <Form.ControlLabel style={{color: '#313866', fontSize: '20px', fontFamily: 'sans-serif'}}>Password</Form.ControlLabel>
          <Form.Control
            name="password"
            type="password"
            required
            onChange={value => handleInputChange('password', value)}
          />
        </Form.Group>
        <Form.Group className='fullname-group'>
          <Form.ControlLabel style={{color: '#313866', fontSize: '20px', fontFamily: 'sans-serif'}}>Full Name</Form.ControlLabel>
          <Form.Control
            name="fullName"
            required
            onChange={value => handleInputChange('fullname', value)}
          />
        </Form.Group>
        <Form.Group className='address-group'>
          <Form.ControlLabel style={{color: '#313866', fontSize: '20px', fontFamily: 'sans-serif'}}>Address</Form.ControlLabel>
          <Form.Control
            name="address"
            componentClass="textarea"
            rows={6}
            required
            onChange={value => handleInputChange('address', value)}
          />
        </Form.Group>
        <Form.Group className='contact-group'>
          <Form.ControlLabel style={{color: '#313866', fontSize: '20px', fontFamily: 'sans-serif'}}>Contact Number</Form.ControlLabel>
          <Form.Control
            name="contactNumber"
            required
            onChange={value => handleInputChange('contactNumber', value)}
          />
        </Form.Group>
        <Button appearance="primary" type="submit" className='button-group'>
          Register
        </Button>
        <Link to="/login" className='login-link'>Already have an account? Log In</Link>
      </Form>
      
    </div>
  )
}
