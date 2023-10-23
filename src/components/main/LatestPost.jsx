/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Col, Row } from 'react-bootstrap';
import ResponsivePagination from 'react-responsive-pagination';
import axios from 'axios';
import './latest.css';
import SearchBar from '../search/SearchBar';

const LatestPost = () => {
  const [allPosts, setAllPosts] = useState({ blog: [] });
  const [filteredPosts, setFilteredPosts] = useState({ blog: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [postComments, setPostComments] = useState({});
  const [openComments, setOpenComments] = useState(null);
  const [editedComment, setEditedComment] = useState({});
  const [editedCommentIndex, setEditedCommentIndex] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  const handlePagination = value => {
    setCurrentPage(value);
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts?page=${currentPage}`
      );
      setAllPosts(response.data);
      setFilteredPosts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleComments = postId => {
    if (openComments === postId) {
      setOpenComments(null);

      setEditedComment({});
      setEditedCommentIndex(null);
    } else {
      setOpenComments(postId);
      getCommentsForPost(postId);
    }
  };

  const filterPosts = term => {
    if (term.trim() === '') {
      setFilteredPosts(allPosts);
    } else {
      const filtered = allPosts.blog.filter(post =>
        post.title.toLowerCase().includes(term)
      );
      setFilteredPosts({ blog: filtered });
    }
  };

  const getCommentsForPost = async postId => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${postId}/comments`
      );

      setPostComments({
        ...postComments,
        [postId]: response.data.comm,
      });
    } catch (error) {
      console.log('Errore nel recupero dei commenti:', error);
    }
  };

  const editComment = (postId, commentId, newContent) => {
    const updatedComments = { ...postComments };
    const post = updatedComments[postId];

    if (post) {
      const comment = post.find(c => c._id === commentId);

      if (comment) {
        comment.content = newContent;
        setPostComments(updatedComments);

        localStorage.setItem('editedComments', JSON.stringify(updatedComments));
      }
    }
  };

  const saveEditedComment = (postId, commentId) => {
    const updatedContent = editedComment[commentId];

    axios
      .put(
        `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${postId}/comments/${commentId}/modify`,
        { content: updatedContent }
      )
      .then(response => {
        if (response.status === 200) {
          editComment(postId, commentId, updatedContent);

          setEditedComment({});
          setEditedCommentIndex(null);
        }
      })
      .catch(error => {
        console.log('Errore durante il salvataggio del commento:', error);
      });
  };

  const addNewComment = async postId => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${postId}/comment/create`,
        {
          username: userName,
          content: newComment,
        }
      );

      if (response.status === 201) {
        const newCommentData = response.data.payload;
        setPostComments(prevComments => ({
          ...prevComments,
          [postId]: [...(prevComments[postId] || []), newCommentData],
        }));

        setNewComment('');
        setUserName('');
      } else {
        console.error(
          "Errore durante l'invio del commento: risposta non valida"
        );
      }
    } catch (error) {
      console.error("Errore durante l'invio del commento:", error);
    }
  };

  const deleteComment = (postId, commentId) => {
    if (window.confirm('Sei sicuro di voler eliminare il commento?')) {
      const updatedComments = { ...postComments };
      updatedComments[postId] = updatedComments[postId].filter(
        comment => comment._id !== commentId
      );
      setPostComments(updatedComments);

      axios
        .delete(
          `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${postId}/comments/${commentId}/delete`
        )
        .then(response => {
          if (response.status === 204) {
          }
        })
        .catch(error => {
          console.log("Errore durante l'eliminazione del commento:", error);
        });
    }
  };

  useEffect(() => {
    getPosts();
  }, [currentPage]);

  useEffect(() => {
    filterPosts(searchTerm.toLowerCase());
  }, [searchTerm]);

  useEffect(() => {
    const persistedComments =
      JSON.parse(localStorage.getItem('editedComments')) || {};
    setPostComments(persistedComments);
  }, []);

  return (
    <Container className='contenitore'>
      <Row>
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />
      </Row>
      <Row>
        {filteredPosts.blog.map((post, i) => (
          <Col
            key={i}
            lg={4}
            md={6}
            xs={12}>
            <Card className='m-3'>
              <Card.Body>
                <Card.Img
                  variant='top'
                  src={post.cover}
                  style={{ height: '16em' }}
                />
                <Card.Title>{post.title}</Card.Title>
                <small>Genre: {post.category}</small>
                <Card.Text>
                  <small>Reading time </small>
                  {post.readTime.value}
                  {post.readTime.unit}
                </Card.Text>
                <Card.Img
                  className='mb-3'
                  style={{ width: '2em' }}
                  src={post.author.avatar}
                />
                <small>{post.author.name}</small>
                <br></br>
                <small>{post.author._id}</small>
                <Card.Text>{post.content}</Card.Text>
                <Link
                  to={`https://letmegooglethat.com/?q=${post.title}`}
                  target='_blank'>
                  <Button variant='danger'>Read</Button>
                </Link>

                <Button
                  variant='light'
                  className='mx-4'
                  onClick={() => toggleComments(post._id)}>
                  {openComments === post._id ? 'Close' : 'View Comments'}
                </Button>
                {openComments === post._id && postComments[post._id] && (
                  <div className='commenti'>
                    <h4>Comments:</h4>
                    <ul>
                      {postComments[post._id].map((comment, commentIndex) => (
                        <li key={commentIndex}>
                          <strong>{comment.username}:</strong>{' '}
                          {editedCommentIndex === commentIndex ? (
                            <input
                              type='text'
                              value={
                                editedComment[comment._id] || comment.content
                              }
                              onChange={e => {
                                const updatedEditedComment = {
                                  ...editedComment,
                                };
                                updatedEditedComment[comment._id] =
                                  e.target.value;
                                setEditedComment(updatedEditedComment);
                              }}
                            />
                          ) : (
                            comment.content
                          )}
                          {editedCommentIndex === commentIndex ? (
                            <Button
                              variant='primary'
                              onClick={() =>
                                saveEditedComment(post._id, comment._id)
                              }>
                              Save
                            </Button>
                          ) : (
                            <div className='mod-buttons'>
                              <Button
                                className='edit'
                                variant='primary'
                                onClick={() => {
                                  setEditedCommentIndex(commentIndex);
                                  const updatedEditedComment = {
                                    ...editedComment,
                                  };
                                  updatedEditedComment[comment._id] =
                                    comment.content;
                                  setEditedComment(updatedEditedComment);
                                }}>
                                Edit
                              </Button>
                              <Button
                                className='delete'
                                variant='danger'
                                onClick={() =>
                                  deleteComment(post._id, comment._id)
                                }>
                                Delete
                              </Button>
                            </div>
                          )}
                        </li>
                      ))}
                      <li>
                        <input
                          type='text'
                          value={userName}
                          placeholder='Your Name'
                          onChange={e => setUserName(e.target.value)}
                        />
                        <input
                          type='text'
                          value={newComment}
                          placeholder='Add a Comment'
                          onChange={e => setNewComment(e.target.value)}
                        />
                      </li>
                      <Button
                        variant='primary'
                        onClick={() => addNewComment(post._id)}>
                        Add Comment
                      </Button>
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col className='d-flex justify-content-center'>
          <ResponsivePagination
            current={currentPage}
            total={allPosts.totalPages}
            onPageChange={handlePagination}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LatestPost;
