import React from 'react'
import { Form, Button } from "rsuite"
import '../css/registration.css'
export default function Registration() {
  return (
    <div className="registration-container">
      <h1 style={{color: '#900C3F', fontFamily: 'revert-layer'}}>Create your Account</h1>
      <Form className='registration-form'>
        <Form.Group className='email-group'>
          <Form.ControlLabel style={{color: '#313866', fontSize: '20px', fontFamily: 'sans-serif'}}>Email</Form.ControlLabel>
          <Form.Control
            name="email"
            required
          />
        </Form.Group>
        <Form.Group className='password-group'>
          <Form.ControlLabel style={{color: '#313866', fontSize: '20px', fontFamily: 'sans-serif'}}>Password</Form.ControlLabel>
          <Form.Control
            name="password"
            type="password"
            required
          />
        </Form.Group>
        <Form.Group className='fullname-group'>
          <Form.ControlLabel style={{color: '#313866', fontSize: '20px', fontFamily: 'sans-serif'}}>Full Name</Form.ControlLabel>
          <Form.Control
            name="fullName"
            required
          />
        </Form.Group>
        <Form.Group className='address-group'>
          <Form.ControlLabel style={{color: '#313866', fontSize: '20px', fontFamily: 'sans-serif'}}>Address</Form.ControlLabel>
          <Form.Control
            name="address"
            componentClass="textarea"
            rows={3}
            required
          />
        </Form.Group>
        <Form.Group className='contact-group'>
          <Form.ControlLabel style={{color: '#313866', fontSize: '20px', fontFamily: 'sans-serif'}}>Contact Number</Form.ControlLabel>
          <Form.Control
            name="contactNumber"
            required
          />
        </Form.Group>
        <Button appearance="primary" type="submit" className='button-group'>
          Register
        </Button>
      </Form>
    </div>
  )
}
