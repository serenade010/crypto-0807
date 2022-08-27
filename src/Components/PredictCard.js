import { React, useEffect, useState } from 'react';
import './PredictCard.css';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from 'react-select';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function PredictCard(props) {
  const [fromvalue, setFromValue] = useState(null);
  const [tovalue, setToValue] = useState(null);
  const [modelID, setModelID] = useState();
  const [model, setModel] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await axios.get(
        `https://boiling-garden-25075.herokuapp.com/model/${modelID}`
      );
      await setModel(response.data.model);
      // ...
    }
    fetchData();
  }, [modelID]);

  const predictPrice = () => {
    handleToggle();
    axios
      .post('https://model-api-nccu.herokuapp.com/predict/lstm', {
        begin: fromvalue,
        end: tovalue,
        ratio_of_train: model.Ratio_of_train,
        look_back: model.Look_back,
        forecast_days: 5,
        OHLC: 'Adj Close',
        features: ['BTC-USD', '^DJI', '^GSPC', 'MWL=F'],
        predicted_ticket: 'BTC-USD',
        layers: [{ units: 50, dropout: 0.2 }],
        learning_rate: model.Learning_rate,
        epochs: model.Epochs,
        batch_size: model.Batch_size,
      })
      .then(function (response) {
        props.setResult(response.data);
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="predictCard-container">
      <div className="predictCard-from">
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <h3>From:</h3>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            value={fromvalue}
            onChange={(newValue) => {
              setFromValue(newValue.format().substring(0, 10));
              props.setFrom(newValue.unix());
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="predictCard-from">
        <h3>To:</h3>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            value={tovalue}
            onChange={(newValue) => {
              setToValue(newValue.format().substring(0, 10));
              props.setTo(newValue.unix());
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="predictCard-model">
        <Select
          // value={e.value}
          options={props.options}
          onChange={(e) => {
            setModelID(e.value);
          }}
        />
      </div>
      <button
        className="predictCard-button"
        onClick={() => {
          predictPrice();
        }}
      >
        Predict
      </button>
    </div>
  );
}

export default PredictCard;
