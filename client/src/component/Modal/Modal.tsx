import React, { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

interface ModalProps {
  text: string;
  variant: 'primary' | 'danger';
  isSignUpFLow: boolean;
}

const ErrorMessage = styled.div`
  color: red;
`;

export default function ModalComponent({ text, variant, isSignUpFLow }: ModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleClick = async () => {
    let data;

    if (isSignUpFLow) {
      const { data: signUpData } = await axios.post('http://localhost:4000/auth/signup', {
        email,
        password,
      });

      data = signUpData;
    } else {
      const { data: logInData } = await axios.post('http://localhost:4000/auth/login', {
        email,
        password,
      });
      data = logInData;
      console.log(logInData, 'here');
    }

    if (data.errors.length) {
      setError(data.errors[0].msg);
    }

    localStorage.setItem('token_mern', data.data.token);
  };

  return (
    <>
      <Button
        onClick={handleModal}
        variant={variant}
        size='lg'
        style={{ marginRight: '1rem', padding: '0.5rem 2rem' }}
      >
        {text}
      </Button>
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form action='' onSubmit={handleSubmit}> */}
          <InputGroup className='mb-3'>
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Password</InputGroup.Text>

            <FormControl
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {/* </form> */}

          {/* <form onSubmit={handleSubmit}>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </form> */}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClick}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
