/** @format */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const [login, setLogin] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/login`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(loginData),
        }
      );
      const data = await response.json();

      if (data.token) {
        localStorage.setItem('loggedInUser', JSON.stringify(data.token));
        navigate('/Home');
      } else {
        setErrorMessage('Email o password errati');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const githubAccess = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
  };

  return (
    <div className='p-3 '>
      <section className='wrapper'>
        <div class='top'>Login</div>
        <div
          className='bottom'
          aria-hidden='true'>
          Login
        </div>
      </section>
      <form
        onSubmit={onSubmit}
        className='gap-2 p-3 text-white'>
        <span className='mail'>Email</span>
        <input
          className='p-2 rounded'
          type='text'
          name='email'
          placeholder='MarioRossi@gmail.com'
          required
          onChange={handleInputChange}
        />
        <span className='psw'>Password</span>
        <input
          className='p-2 rounded'
          type='password'
          name='password'
          placeholder='Password1234!'
          required
          onChange={handleInputChange}
        />
        {errorMessage && (
          <div className='error-message text-danger'>{errorMessage}</div>
        )}
        <button
          className='glowing-btn'
          type='submit'>
          <span className='glowing-txt'>
            L<span className='faulty-letter'>O</span>GIN
          </span>
        </button>
      </form>

      <button
        className='glowing-btn-2'
        onClick={() => githubAccess()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          classame='bi bi-github '
          viewBox='0 0 16 16'>
          <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
        </svg>
        <span> ACCESS WITH GITHUB</span>
      </button>
      <div className='registration flex items-center justify-center mt-6'>
        <Link
          to='/registration'
          className='link inline-flex items-center'>
          <span className='ml-2'>You don't have an account?</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
