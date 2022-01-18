import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

interface User {
  data: {
    id: string;
    email: string;
  } | null;

  error: [{ msg: string }] | null;

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

  const token = localStorage.getItem('token-mern');

  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    const { data } = await axios.get('http://localhost:8080/auth/me');
    if (data.data) {
      console.log(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
