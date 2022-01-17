import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import ModalComponent from '../Modal/Modal';

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 60vh;
  background-image: url('https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
`;

const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 3rem;
  color: white;
  width: 32.5rem;
`;

const Heading = styled.h1`
  font-size: 3.5rem;
`;

const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`;

export default function Hero() {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Feed Your Mind WIth The Best</Heading>
          <SubHeading>
            Grow, learn and become successful by reading some of the top articles by reputable
            individuals
          </SubHeading>
          <ModalComponent text='Sign up' variant='primary' isSignUpFLow={true} />
          <ModalComponent text='Log in' variant='danger' isSignUpFLow={false} />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
}
