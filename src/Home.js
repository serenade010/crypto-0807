import React from 'react';
import './Home.css';

import { Link } from 'react-router-dom';

function home() {
  return (
    <>
      <nav>
        <Link to="/model">Model</Link>
        <Link to="/predict">Predict</Link>
        <Link to="/price">Price</Link>
      </nav>
    </>
  );
}

export default home;
