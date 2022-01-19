import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const CardHeader = styled.div`
  height: 30rem;
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: o.1rem 0.1rem 1rem rgba(19, 20, 19, 0.343);
`;

const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  text-shadow: o.1rem 0.1rem 1rem rgba(19, 20, 19, 0.343);
`;

const backgroundColors: any = {
  Basic: 'rgb(104, 219 104)',
  Standard: 'rgb(185, 42, 23, 0.8)',
  Premium: 'pink',
};

const createSession = async (priceId: string) => {
  const { data: response } = await axios.post('http://localhost:4000/subs/session', {
    priceId,
  });

  window.location.href = response.url;
};

export default function ArticlesPlan() {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data: response } = await axios.get('http://localhost:4000/subs/prices');
    setPrices(response.data);
    console.log(response.data);
  };

  return (
    <Container>
      <CardsContainer>
        {prices.map((price: any) => (
          <Card key={price.id} style={{ width: '18rem', height: '25rem', marginRight: '2rem' }}>
            <CardHeader style={{ backgroundColor: backgroundColors[price.nickname] }}>
              <PriceCircle>
                <PriceText>{price.unit_amount / 1000}</PriceText>
              </PriceCircle>
            </CardHeader>

            <Card.Body>
              <Card.Title style={{ fontSize: '2rem' }}>{price.nickname}</Card.Title>
              <Button
                variant='primary'
                className='mt-4'
                onClick={() => {
                  createSession(price.id);
                }}
              >
                Buy Now
              </Button>
            </Card.Body>
          </Card>
        ))}
      </CardsContainer>
    </Container>
  );
}
