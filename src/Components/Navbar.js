import React from 'react';
import './Navbar.css';
import Userinfo from './Userinfo';
import { Link, useLocation } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';

function Navbar(props) {
  const location = useLocation();

  //   const [currentPage, SetCurrentPage] = useState(location);
  //   useEffect = () => {
  //     () => {};
  //   };
  return (
    <div className="nav-container">
      <Userinfo name={props.name} />
      <Link
        to="/price"
        style={{ textDecoration: 'none' }}
        state={{ id: props.id, name: props.name }}
      >
        <div
          className="nav-func"
          id={location.pathname === '/price' ? 'nav-active' : 'nav'}
        >
          Price
        </div>
      </Link>
      <Link
        to="/model"
        style={{ textDecoration: 'none' }}
        state={{ id: props.id, name: props.name }}
      >
        <div
          className="nav-func"
          id={location.pathname === '/model' ? 'nav-active' : 'nav'}
        >
          Model
        </div>
      </Link>
      <Link
        to="/news"
        style={{ textDecoration: 'none' }}
        state={{ id: props.id, name: props.name }}
      >
        <div
          className="nav-func"
          id={location.pathname === '/news' ? 'nav-active' : 'nav'}
        >
          News
        </div>
      </Link>
      <Link
        to="/"
        style={{ textDecoration: 'none' }}
        // state={{ id: props.id, name: props.name }}
      >
        <div
          className="nav-func-signout"
          // state={{ id: null, name: null }}
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
