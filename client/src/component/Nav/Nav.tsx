import { Navbar, NavItem, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <Navbar>
      <NavItem>
        <Link to='/' className='nav-link'>
          Home
        </Link>
      </NavItem>
    </Navbar>
  );
}
