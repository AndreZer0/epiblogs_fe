/** @format */

import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    avatar: '',
    birth: '',
    email: '',
    password: '',
  });
  const [isSuccessful, setIsSuccessful] = useState(false);

  const navigate = useNavigate();

  const handleChange = event => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const birthNumber = Date.parse(userData.birth);

    if (
      isNaN(birthNumber) ||
      userData.firstName.length < 3 ||
      userData.lastName.length < 3 ||
      userData.password.length < 4 ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email)
    ) {
      setMessage('Data entry errors. Retry.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/authors/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...userData,
            birth: new Date(birthNumber),
          }),
        }
      );

      if (response.ok) {
        setUserData({
          firstName: '',
          lastName: '',
          avatar: '',
          birth: '',
          email: '',
          password: '',
        });
        setMessage(
          'Author successfully created. You will be redirected to the login page.'
        );
        setTimeout(() => {
          setMessage('');
          setIsSuccessful(true);
          navigate('https://leafy-platypus-dcee28.netlify.app');
        }, 3000);
      } else {
        setMessage("Errore durante la creazione dell'autore");
        setTimeout(() => {
          setMessage('');
          setIsSuccessful(false);
        }, 3000);
      }

      setIsLoading(false);
    } catch (error) {
      setMessage("Errore durante la creazione dell'autore: " + error.message);
      setTimeout(() => {
        setMessage('');
      }, 4000);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className='spinner-container'>
          <Spinner
            animation='border'
            role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
          <p>Loading...</p>
        </div>
      ) : isSuccessful ? (
        <Navigate to='/' />
      ) : (
        <main className='format'>
          <h2>Create a new author!</h2>
          <Form
            noValidate
            className='form-body-user'>
            <Form.Group
              className='elementsForm'
              as={Col}
              controlId='firstName'>
              <Form.Label className='input-title'>First Name</Form.Label>
              <Form.Control
                required
                type='text'
                name='firstName'
                placeholder='Insert your first name'
                value={userData.firstName}
                onChange={handleChange}
              />
              {userData.firstName.length < 3 &&
                userData.firstName.length > 0 && (
                  <div className='error-message'>
                    The name must be at least 3 characters long.
                  </div>
                )}
            </Form.Group>

            <Form.Group
              className='elementsForm'
              as={Col}
              controlId='lastName'>
              <Form.Label className='input-title'>Last Name</Form.Label>
              <Form.Control
                required
                type='text'
                name='lastName'
                placeholder='Insert your last name'
                value={userData.lastName}
                onChange={handleChange}
              />
              {userData.lastName.length < 3 && userData.lastName.length > 0 && (
                <div className='error-message'>
                  The last name must be at least 3 characters long.
                </div>
              )}
            </Form.Group>

            <Form.Group
              className='elementsForm'
              as={Col}
              controlId='avatar'>
              <Form.Label className='input-title'>Avatar URL</Form.Label>
              <Form.Control
                required
                type='text'
                name='avatar'
                placeholder='Insert an URL'
                value={userData.avatar}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className='elementsForm'
              as={Col}
              controlId='birth'>
              <Form.Label className='input-title'>Birth</Form.Label>
              <Form.Control
                required
                type='date'
                name='birth'
                placeholder='Birthday'
                value={userData.birth}
                onChange={handleChange}
              />
              {isNaN(Date.parse(userData.birth)) &&
                userData.birth.trim() !== '' && (
                  <div className='error-message'>
                    Enter a valid date of birth.
                  </div>
                )}
            </Form.Group>

            <Form.Group
              className='elementsForm'
              as={Col}
              controlId='email'>
              <Form.Label className='input-title'>Email</Form.Label>
              <Form.Control
                required
                type='email'
                name='email'
                placeholder='Email'
                value={userData.email}
                onChange={handleChange}
              />
              {!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                userData.email
              ) && <div className='error-message'>Enter a valid email.</div>}
            </Form.Group>

            <Form.Group
              className='elementsForm'
              as={Col}
              controlId='password'>
              <Form.Label className='input-title'>Password</Form.Label>
              <Form.Control
                required
                type='password'
                name='password'
                placeholder='Password'
                value={userData.password}
                onChange={handleChange}
              />
              {userData.password.length < 4 && userData.password.length > 0 && (
                <div className='error-message'>
                  The password must be at least 4 characters long.
                </div>
              )}
            </Form.Group>

            <Button
              className='buttonAddComment'
              type='submit'
              onClick={handleSubmit}>
              Add
            </Button>
            <div className='message-container'>
              {message && (
                <div
                  className={
                    message.includes('Errore')
                      ? 'NOT-success-message-put'
                      : 'success-message-put-user'
                  }>
                  {message}
                </div>
              )}
            </div>
          </Form>
        </main>
      )}
    </>
  );
};

export default Signup;
