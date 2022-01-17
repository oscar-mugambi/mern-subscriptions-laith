import React, { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

interface ModalProps {
  text: string;
  variant: 'primary' | 'danger';
  isSignUpFLow: boolean;
}

export default function ModalComponent({ text, variant, isSignUpFLow }: ModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = () => {
    console.log('clicked submit');
  };

  const handleClick = async () => {
    let data;

    if (isSignUpFLow) {
      console.log(email, password);
      const response = await axios.post('http://localhost:4000/auth/signup', {
        email,
        password,
      });
      console.log(response);
    } else {
      const response = await axios.post('http://localhost:4000/auth/login', {
        email,
        password,
      });
      console.log(response);
    }
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
          <form action='' onSubmit={handleSubmit}>
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
          </form>

          {/* <form onSubmit={handleSubmit}>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </form> */}
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
