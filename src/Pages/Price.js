import React from 'react';
import './Price.css';
import Navbar from '../Components/Navbar';
import PlotyCard from '../Components/PlotlyCard';
import { useLocation } from 'react-router-dom';

function Price() {
  const { state } = useLocation();
  const { id, name } = state;
  return (
    <div className="price-container">
      <Navbar id={id} name={name} />
      <div className="price-ploty-container">
        <PlotyCard />
      </div>
    </div>
  );
}

export default Price;
