/** @format */

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './form.css';
import axios from 'axios';

const Blog = () => {
  const [file, setFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    readTime: {
      value: 0,
      unit: '',
    },
    author: {
      name: '',
      avatar: '',
    },
    content: '',
  });

  const onChangeSetFiles = (e, type) => {
    if (type === 'cover') {
      setFile(e.target.files[0]);
    } else if (type === 'avatar') {
      setAvatarFile(e.target.files[0]);
    }
  };

  const uploadFile = async cover => {
    const fileData = new FormData();
    fileData.append('cover', cover);
    try {
      const response = await fetch(
        'http://localhost:5050/blogPosts/cloudUploads/cover',
        {
          method: 'POST',
          body: fileData,
        }
      );
      return response.json();
    } catch (error) {
      console.log('Errore nel caricamento del post', error);
    }
  };

  const uploadAvatarFile = async avatar => {
    const avatarData = new FormData();
    avatarData.append('author.avatar', avatar);
    try {
      const response = await fetch(
        'http://localhost:5050/blogPosts/cloudUploads/avatar',
        {
          method: 'POST',
          body: avatarData,
        }
      );
      return response.json();
    } catch (error) {
      console.log("Errore nel caricamento dell'avatar", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({
      title: '',
      category: '',
      readTime: {
        value: 0,
        unit: '',
      },
      author: {
        name: '',
        avatar: '',
      },
      content: '',
    });
    setErrors({});
    setFile(null);
    setAvatarFile(null);
  };

  const handleShow = () => setShow(true);

  const handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const nameParts = name.split('.');
    if (nameParts.length === 1) {
      setFormData({ ...formData, [name]: value });
    } else if (nameParts.length === 2) {
      setFormData({
        ...formData,
        [nameParts[0]]: {
          ...formData[nameParts[0]],
          [nameParts[1]]: value,
        },
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (file && avatarFile) {
      try {
        const uploadCover = await uploadFile(file);
        const uploadAvatar = await uploadAvatarFile(avatarFile);
        const finalBody = {
          ...formData,
          cover: uploadCover.cover,
          author: { ...formData.author, avatar: uploadAvatar.avatar },
        };
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/create`,
          finalBody
        );

        handleClose();
        window.location.reload();
      } catch (e) {
        console.log('Errore nel caricamento del post', e);
      }
    }
  };

  return (
    <>
      <h1 className='title'>Add your horror story</h1>
      <button
        className='add'
        onClick={handleShow}>
        Add
      </button>

      <Modal
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tell me a creepy story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            encType='multipart/form-data'>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              id='title'
              name='title'
              onChange={handleInputChange}
              required
            />
            <label htmlFor='category'>Category:</label>
            <input
              type='text'
              id='category'
              name='category'
              onChange={handleInputChange}
              required
            />
            <label className='cover'> Cover:</label>
            <input
              type='file'
              id='cover'
              name='cover'
              onChange={e => onChangeSetFiles(e, 'cover')}
              required
            />
            <label className='readTimeValue'>Read time value:</label>
            <input
              type='number'
              id='readTimeValue'
              name='readTime.value'
              value={formData.readTime.value}
              onChange={handleInputChange}
              min={0}
              required
            />
            <label className='readTimeUnit'>Read time unit:</label>
            <select
              id='readTimeUnit'
              name='readTime.unit'
              value={formData.readTime.unit}
              onChange={handleInputChange}
              required>
              <option value=''>Select Unit</option>
              <option value='minutes'>min</option>
            </select>

            <label className='authorName'>Author:</label>
            <input
              type='text'
              id='authorName'
              name='author.name'
              onChange={handleInputChange}
              required
            />
            <label className='authorAvatar'>Author Avatar:</label>
            <input
              type='file'
              id='authorAvatar'
              name='author.avatar'
              onChange={e => onChangeSetFiles(e, 'avatar')}
              required
            />

            <label className='content'>Your story:</label>
            <textarea
              id='content'
              name='content'
              rows='4'
              cols='50'
              onChange={handleInputChange}
              required
            />
            <button
              type='submit'
              className='salva'>
              Save Changes
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleClose}
            className='chiudi'>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Blog;
