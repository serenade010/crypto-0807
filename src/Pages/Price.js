import React from 'react';
import './Price.css';
import Navbar from '../Components/Navbar';
import PlotyCard from '../Components/PlotlyCard';

function Price() {
  return (
    <div className="price-container">
      <Navbar />
      <div className="price-ploty-container">
        <PlotyCard />
      </div>
    </div>
  );
}

export default Price;
