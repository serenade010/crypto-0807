import React from 'react';
import './Navbar.css';
import Userinfo from './Userinfo';
import { Link, useLocation } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
function Navbar() {
  const location = useLocation();
  //   const [currentPage, SetCurrentPage] = useState(location);
  //   useEffect = () => {
  //     () => {};
  //   };
  return (
    <div className="nav-container">
      <Userinfo />
      <Link to="/price" style={{ textDecoration: 'none' }}>
        <div
          className="nav-func"
          id={location.pathname === '/price' ? 'nav-active' : 'nav'}
        >
          Price
        </div>
      </Link>
      <Link to="/model" style={{ textDecoration: 'none' }}>
        <div
          className="nav-func"
          id={location.pathname === '/model' ? 'nav-active' : 'nav'}
        >
          Model
        </div>
      </Link>
      <Link to="/news" style={{ textDecoration: 'none' }}>
        <div
          className="nav-func"
          id={location.pathname === '/news' ? 'nav-active' : 'nav'}
        >
          News
        </div>
      </Link>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <div
          className="nav-func-signout"
        //   id={location.pathname === '/news' ? 'nav-active' : 'nav'}
        >
          <FaPowerOff />
          <div className="margin-left">Sign out</div>
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
