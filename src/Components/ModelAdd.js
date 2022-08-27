import React from 'react';
import './ModelAdd.css';
import { GrAdd } from 'react-icons/gr';
import Modal from 'react-modal';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

function ModelAdd(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState();
  const [ratioOfTrain, setRatioOfTrain] = useState();
  const [lookBack, setlookBack] = useState();
  const [learnRate, setLearnRate] = useState();
  const [epoch, setEpoch] = useState();
  const [batchSize, setBatchSize] = useState();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#000';
  }
  function closeModal() {
    setIsOpen(false);
  }

  const createModel = () => {
    axios
      .post('https://boiling-garden-25075.herokuapp.com/model', {
        Name: name,
        Ratio_of_train: parseFloat(ratioOfTrain),
        Look_back: parseInt(lookBack),
        Learning_rate: parseFloat(learnRate),
        Epochs: parseInt(epoch),
        Batch_size: parseInt(batchSize),
        UserID: props.id,
      })
      .then(function (response) {
        console.log(response);
        props.fetchModels();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="modeladd-container">
      <GrAdd onClick={openModal} className="modeladd-icon" />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modaladd-close">
          <AiOutlineClose onClick={closeModal} />
        </div>

        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Build Your Model</h2>

        <form className="modeladd-form">
          <input
            className="modeladd-input"
            placeholder="Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
          <input
            className="modeladd-input"
            placeholder="Train Data Size"
            value={ratioOfTrain}
            onChange={(event) => {
              setRatioOfTrain(event.target.value);
            }}
          ></input>
          <input
            className="modeladd-input"
            placeholder="Look Back Day"
            value={lookBack}
            onChange={(event) => {
              setlookBack(event.target.value);
            }}
          ></input>
          <input
            className="modeladd-input"
            placeholder="Learning Rate"
            value={learnRate}
            onChange={(event) => {
              setLearnRate(event.target.value);
            }}
          ></input>
          <input
            className="modeladd-input"
            placeholder="Epoch"
            value={epoch}
            onChange={(event) => {
              setEpoch(event.target.value);
            }}
          ></input>
          <input
            className="modeladd-input"
            placeholder="Batch Size"
            value={batchSize}
            onChange={(event) => {
              setBatchSize(event.target.value);
            }}
          ></input>
        </form>
        <div className="modeladd-create-container">
          <button
            className="modeladd-create"
            onClick={() => {
              createModel();
              closeModal();
              setName('');
              setRatioOfTrain();
              setlookBack();
              setLearnRate();
              setEpoch();
              setBatchSize();
            }}
          >
            create
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModelAdd;
