import { useContext } from 'react';
import { Navbar, NavItem, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';

export default function Nav() {
  const [state, setState] = useContext(UserContext);

  console.log(state, 'stateful');

  return (
    <Navbar>
      <NavItem>
        <Link to='/' className='nav-link'>
          Home
        </Link>
      </NavItem>
      {state.data && (
        <>
          <NavItem>
            <NavLink>Logout</NavLink>
          </NavItem>
        </>
      )}
    </Navbar>
  );
}
