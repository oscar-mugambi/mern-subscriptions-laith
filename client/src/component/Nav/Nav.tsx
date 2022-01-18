import { useContext } from 'react';
import { Navbar, NavItem, NavLink } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../context';

const LeftNavContainer = styled.div`
  margin-left: auto;
`;

export default function Nav() {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();
  console.log(state, 'stateful');

  const handleLogout = () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem('token_mern');
    navigate('/');
  };

  return (
    <Navbar>
      <NavItem>
        <Link to='/' className='nav-link'>
          Home
        </Link>
      </NavItem>
      {state.data && (
        <LeftNavContainer>
          <NavItem>
            <NavLink onClick={handleLogout}>Logout</NavLink>
          </NavItem>
        </LeftNavContainer>
      )}
    </Navbar>
  );
}
