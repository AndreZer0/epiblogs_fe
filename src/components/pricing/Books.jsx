/** @format */

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './books.css';

const HorrorBooksTable = ({ isOpen, onClose, books }) => {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      className='libri'>
      <Modal.Header closeButton>
        <Modal.Title>Horror Masterpieces</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='libri-details'>
          <table className='table'>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={book.cover}
                      alt={book.title}
                      style={{ width: '100px', height: '150px' }}
                    />
                  </td>
                  <td>{book.title}</td>
                  <td className='d-none d-md-table-cell'>{book.author}</td>
                  <td>{book.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HorrorBooksTable;
