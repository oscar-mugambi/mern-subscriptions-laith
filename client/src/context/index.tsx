import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

interface User {
  data: {
    id: string;
    email: string;
    customerStripeId: string;
  } | null;

  error: string | null;

  loading: boolean;
}

const UserContext = createContext<[User, React.Dispatch<React.SetStateAction<User>>]>([
  { data: null, loading: true, error: null },
  () => {},
]);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    error: null,
  });

  const token = localStorage.getItem('token_mern');

  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    const { data: response } = await axios.get('http://localhost:4000/auth/me');
    if (response.data && response.data.user) {
      setUser({
        data: {
          id: response.data.user.id,
          email: response.data.user.email,
          customerStripeId: response.data.user.customerStripeId,
        },
        loading: false,
        error: null,
      });
    } else if (response.data && response.data.errors.length) {
      setUser({
        data: null,
        loading: false,
        error: response.errors[0].msg,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      });
    }
  }, []);

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
