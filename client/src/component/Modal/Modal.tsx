import { useState, useContext } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';

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

  const navigate = useNavigate();
  const [state, setState] = useContext(UserContext);
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
    }

    if (data.errors.length) {
      return setError(data.errors[0].msg);
    }

    setState({
      data: {
        id: data.data.user.id,
        email: data.data.user.email,
      },
      error: null,
      loading: false,
    });

    localStorage.setItem('token_mern', data.data.token);
    axios.defaults.headers.common['authorization'] = `Bearer ${data.data.token}`;
    navigate('/articles');
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
