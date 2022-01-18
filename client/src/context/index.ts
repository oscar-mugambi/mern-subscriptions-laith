import React, { useState, createContext } from 'react';

export const UserContext = createContext<[User, React.Dispatch<React.SetStateAction<User>>]>([
  { data: null, loading: true, error: null },
  () => {},
]);

interface User {
  data: {
    id: string;
    email: string;
  } | null;

  error: [{ msg: string }] | null;

  loading: boolean;
}

const UserProvider = ({ children: any }) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    error: null,
  });
};
