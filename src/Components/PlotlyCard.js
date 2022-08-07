import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import moment from 'moment';

function PlotCard() {
  const [xdata, setxdata] = useState([]);
  const [ydata, setydata] = useState([]);
  const [pxdata, setPxdata] = useState([]);
  const [pydata, setPydata] = useState([]);
  const [predict, setPredict] = useState(false);
  const [loss, setLoss] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1608244800&to=1655524800`
      )
      .then((res) => {
        setxdata(res.data['prices'].map((arr, index) => arr[0]));
        setydata(res.data['prices'].map((arr, index) => arr[1]));
      });
  }, []);

  const getModelLoss = () => {
    axios.get('http://127.0.0.1:5000/haha').then((res) => {
      // setLoss(res.data);
      console.log(res.data);
    });
  };

  const predictPrice = () => {
    axios.get('http://127.0.0.1:5000/train').then((res) => {
      setPxdata(res.data['index']);
      setPydata(
        res.data['data'].map((arr, index) => {
          return arr[0];
        })
      );
      setPredict(false);
    });
  };
  if (predict) {
    return <div className="training">model training!</div>;
  } else
    return (
      <>
        <div className="price-chart">
          <Plot
            data={[
              {
                x: xdata.map((unix) => {
                  return moment(unix).format();
                }),
                y: ydata,
                type: 'markers',
                mode: 'lines',
                marker: { color: '' },
                name: 'Real Price',
              },
              {
                x: pxdata.map((unix) => {
                  return moment(unix).format();
                }),
                y: pydata,
                type: 'markers',
                mode: 'lines',
                marker: { color: 'blue' },
                name: 'Predict Price',
              },
            ]}
            layout={{ width: 900, height: 600 }}
            config={{ displayModeBar: false }}
          />
        </div>
        {/* <button
          onClick={() => {
            setPredict(true);
            predictPrice();
            // getModelLoss();
          }}
        >
          predict
        </button> */}
      </>
    );
}

export default PlotCard;
