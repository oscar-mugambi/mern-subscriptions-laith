import React, { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

interface ModalProps {
  text: string;
  variant: 'primary' | 'danger';
}

export default function ModalComponent({ text, variant }: ModalProps) {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
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
          <InputGroup className='mb-3'>
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl type='email' />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl type='password' />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleModal}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
