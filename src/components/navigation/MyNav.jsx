/** @format */

import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './nav.css';
import HorrorBooksTable from '../pricing/Books';
import NavLinks from '../data/navLink';
import horrorBooks from '../data/HorrorData';

const MyNav = ({ setSearchTerm, posts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Navbar
      bg='dark'
      data-bs-theme='dark'
      expand='lg'
      className='navbar'>
      <Container className='barra'>
        <a href='# '>
          <img
            alt=''
            src='https://i.postimg.cc/QxS5dy0w/logo.png'
            width='70'
            height='50'
            className='d-inline-block align-top'
          />
        </a>
        <Navbar.Brand href='#home'>Temple of Horror</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <NavLinks openModal={openModal} />{' '}
        </Navbar.Collapse>
      </Container>

      <HorrorBooksTable
        isOpen={isModalOpen}
        onClose={closeModal}
        books={horrorBooks}
      />
    </Navbar>
  );
};

export default MyNav;
