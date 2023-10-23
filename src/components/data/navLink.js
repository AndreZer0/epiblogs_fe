/** @format */

import React from 'react';
import Nav from 'react-bootstrap/Nav';

const NavLinks = ({ openModal }) => {
  return (
    <Nav className='me-auto'>
      <Nav.Link href='#home'>Home</Nav.Link>
      <Nav.Link href='#features'>Latest Stories</Nav.Link>
      <Nav.Link onClick={openModal}>Shopping tips</Nav.Link>{' '}
    </Nav>
  );
};

export default NavLinks;
