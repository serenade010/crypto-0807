import React from 'react';
import './Model';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Model.css';
import ModelCard from '../Components/ModelCard';
import ModelAdd from '../Components/ModelAdd';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Model() {
  const [models, setModels] = useState([]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const location = useLocation();
  const fetchModels = () => {
    handleToggle();
    axios
      .get(`https://boiling-garden-25075.herokuapp.com/models`)
      .then(function (response) {
        // handle success
        setModels(
          response.data.models.filter(
            (model) => model.UserID === location.state.id
          )
        );
        console.log('fetch Models');
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
    <div className="model-container">
      <Navbar id={location.state.id} name={location.state.name} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="model-container-right">
        {models.map((model) => {
          return (
            <ModelCard
              key={model.ID}
              model={model}
              fetchModels={fetchModels}
            ></ModelCard>
          );
        })}
      </div>
      <ModelAdd id={location.state.id} fetchModels={fetchModels} />
    </div>
  );
}

export default Model;
