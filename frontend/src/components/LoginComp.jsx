import React, { useState, useEffect } from 'react';
import { Form, Button } from 'rsuite';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle redirection
import '../css/login.css'
export default function LoginComp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const history = useNavigate(); // Initialize useNavigate

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

    try {
      const response = await fetch('http://localhost:5000/loginVerify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();

        // Set the sessionUserID in localStorage
        localStorage.setItem('sessionUserID', data.user.userid);
        // Redirect to the homepage on successful login
        history('/home');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('Error during login');
    }
  };

  useEffect(() => {
    const storedSession = localStorage.getItem('sessionUserID');
    if (storedSession) {
      history('/home');
    }
  }, [history]);

  return (
    <div className="login-container">
      <h1>Login to your account</h1>
      {errorMessage}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="email-group">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control
            name="email"
            required
            onChange={(value) => handleInputChange('email', value)}
          />
        </Form.Group>
        <Form.Group className="password-group">
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control
            name="password"
            type="password"
            required
            onChange={(value) => handleInputChange('password', value)}
          />
        </Form.Group>
        <Button appearance="primary" type="submit" className="button-group">
          Login
        </Button>
      </Form>
    </div>
  );
}
