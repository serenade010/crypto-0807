import React from 'react';
import './Model';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';

function Model() {
  const location = useLocation();
  return (
    <div>
      <Navbar id={location.state.id} name={location.state.name} />
    </div>
  );
}

export default Model;
