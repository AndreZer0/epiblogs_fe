/** @format */
import React from 'react';

import './jumbo.css';

const Jumbotron = () => {
  return (
    <div className='jumbo'>
      <div className='jumper'>
        <div className='content'>
          <h2>Vampires</h2>
          <span>Undead creatures</span>
        </div>
      </div>
      <div>
        <div className='content'>
          <h2>Werewolves</h2>
          <span>Skinwalker</span>
        </div>
      </div>
      <div>
        <div className='content'>
          <h2>Ghosts</h2>
          <span>Invisible beings</span>
        </div>
      </div>
      <div>
        <div className='content'>
          <h2>Cthulhu</h2>
          <span>Great Old Ones</span>
        </div>
      </div>
      <div>
        <div className='content'>
          <h2>Mummies</h2>
          <span>Ancient Curses</span>
        </div>
      </div>
      <div>
        <div className='content'>
          <h2>Witchcraft</h2>
          <span>Dark Arts</span>
        </div>
      </div>
      <div>
        <div className='content'>
          <h2>Aliens</h2>
          <span>Are they among us?</span>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
