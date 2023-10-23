/** @format */

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './success.css';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession';
const Success = () => {
  const [loggedInUser, setLoggedInUser] = useSearchParams();
  const navigate = useNavigate();
  const session = useSession();
  console.log(session);
  const [horrorName, setHorrorName] = useState('');

  useEffect(() => {
    const currentToken = Object.fromEntries([...loggedInUser]);
    const valToken = Object.keys(currentToken)[0];
    localStorage.setItem('loggedInUser', JSON.stringify(valToken));

    const horrorNames = [
      'Vladimir the Vampire',
      'Morgana the Witch',
      'Frankenstein',
      'Ruler of Rlyeh',
      'Cursed Mummy',
      'Howling Wolf',
      'Casper',
      'Jack-o-Lantern',
    ];
    const randomHorrorName =
      horrorNames[Math.floor(Math.random() * horrorNames.length)];

    setHorrorName(randomHorrorName);
  }, [loggedInUser]);

  const backHome = () => {
    window.location.href = '/Home';
  };

  return (
    <div className='return'>
      <h1>Welcome, {session.displayName}</h1>
      <h2>{horrorName}</h2>

      <button
        className='back'
        onClick={() => backHome()}>
        Back to Home
      </button>
    </div>
  );
};

export default Success;
