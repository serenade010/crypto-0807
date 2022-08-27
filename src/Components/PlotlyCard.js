import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import moment from 'moment';

function PlotyCard(props) {
  const [xdata, setxdata] = useState([]);
  const [ydata, setydata] = useState([]);
  const [pxdata, setPxdata] = useState([]);
  const [pydata, setPydata] = useState([]);
  const [ptxdata, setPtxdata] = useState([]);
  const [ptydata, setPtydata] = useState([]);
  const [from, setFrom] = useState(props.from);
  const [to, setTo] = useState(props.to);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${from}&to=${to}`
      )
      .then((res) => {
        setxdata(res.data['prices'].map((arr, index) => arr[0]));
        setydata(res.data['prices'].map((arr, index) => arr[1]));
      });
  }, [from, to]);

  useEffect(() => {
    setFrom(props.from);
  }, [props.from]);

  useEffect(() => {
    setTo(props.to);
  }, [props.to]);

  useEffect(() => {
    if (props.result.length !== 0) {
      setPxdata(props.result['predict_data_test'].map((arr, index) => arr[0]));
    }
  }, [props.result]);

  useEffect(() => {
    if (props.result.length !== 0) {
      setPydata(props.result['predict_data_test'].map((arr, index) => arr[1]));
    }
  }, [props.result]);

  useEffect(() => {
    if (props.result.length !== 0) {
      setPtxdata(
        props.result['predict_data_train'].map((arr, index) => arr[0])
      );
    }
  }, [props.result]);

  useEffect(() => {
    if (props.result.length !== 0) {
      setPtydata(
        props.result['predict_data_train'].map((arr, index) => arr[1])
      );
    }
  }, [props.result]);

  if (false) {
    return <div className="training">model training!</div>;
  } else
    return (
      <>
        <div className="price-chart">
          <Plot
            key={props.from}
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
                marker: { color: 'orange' },
                name: 'Predict Test Price',
              },
              {
                x: ptxdata.map((unix) => {
                  return moment(unix).format();
                }),
                y: ptydata,
                type: 'markers',
                mode: 'lines',
                marker: { color: 'green' },
                name: 'Predict Train Price',
              },
            ]}
            layout={{ width: 1050, height: 600 }}
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

export default PlotyCard;
