/** @format */

import React from 'react';
import './search.css';
const SearchBar = ({ searchTerm, onSearchTermChange }) => {
  return (
    <div className='search-bar'>
      <h3>Are you looking for a bit of a scare?</h3>
      <input
        type='text'
        placeholder='Enter a keyword'
        value={searchTerm}
        onChange={e => onSearchTermChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
