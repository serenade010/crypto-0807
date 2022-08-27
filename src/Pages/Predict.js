import React from 'react';
import './Predict.css';
import Navbar from '../Components/Navbar';
import PlotyCard from '../Components/PlotlyCard';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PredictCard from '../Components/PredictCard';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function Predict() {
  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [result, setResult] = useState([]);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const fetchModels = () => {
    handleToggle();
    axios
      .get(`https://boiling-garden-25075.herokuapp.com/models`)
      .then(function (response) {
        // handle success
        setOptions(
          response.data.models
            .filter((model) => model.UserID === location.state.id)
            .map((model) => {
              return { value: model.ID, label: model.Name };
            })
        );
      })

      .then(() => {
        handleClose();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    fetchModels();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="predict-container">
      <Navbar id={location.state.id} name={location.state.name} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="predict-container-right">
        <PredictCard
          options={options}
          setFrom={setFrom}
          setTo={setTo}
          setResult={setResult}
        />
        <PlotyCard from={from} to={to} result={result} />
      </div>
    </div>
  );
}

export default Predict;
