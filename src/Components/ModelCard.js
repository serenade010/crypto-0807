import React from 'react';
import './ModelCard.css';
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
function ModelCard(props) {
  let subtitle;
  // Name           string
  // 	Ratio_of_train float32
  // 	Look_back      int
  // 	Learning_rate  float32
  // 	Epochs         int
  // 	Batch_size     int
  // 	UserID         uint
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [ratioOfTrain, setRatioOfTrain] = useState(props.model.Ratio_of_train);
  const [lookBack, setlookBack] = useState(props.model.Look_back);
  const [learnRate, setLearnRate] = useState(props.model.Learning_rate);
  const [epoch, setEpoch] = useState(props.model.Epochs);
  const [batchSize, setBatchSize] = useState(props.model.Batch_size);
  const [isEdit, setIsEdit] = useState(false);
  const editModel = () => {
    axios
      .put(
        `https://boiling-garden-25075.herokuapp.com/model/${props.model.ID}`,
        {
          Ratio_of_train: parseFloat(ratioOfTrain),
          Look_back: lookBack,
          Learning_rate: parseFloat(learnRate),
          Epochs: parseInt(epoch),
          Batch_size: parseInt(batchSize),
        }
      )
      .then(function (response) {
        props.fetchModels();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteModel = () => {
    axios
      .delete(
        `https://boiling-garden-25075.herokuapp.com/model/${props.model.ID}`
      )
      .then(function (response) {
        alert('Model Deleted!');
        setIsOpen(false);
        console.log(response);
      })
      .then(function (response) {
        props.fetchModels();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#000';
  }
  function closeModal(e) {
    e.stopPropagation();
    setIsOpen(false);
    setIsDisabled(true);
  }
  return (
    <div className="modelcard-container" onClick={openModal}>
      <div className="modelcard-name">{props.model.Name}</div>
      <div className="modelcard-perfomance">{`MSE:${props.model.MSE}`}</div>

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
        <h2
          className="modelcard-title"
          ref={(_subtitle) => (subtitle = _subtitle)}
        >
          {props.model.Name}
        </h2>
        {/* 
        <div>I am a modal</div> */}
        <form className="modeladd-form">
          <div className="modelcard-column">
            <div className="modelcard-column-name">Train Ratio</div>
            <input
              disabled={isDisabled}
              className="modelcard-input"
              placeholder="Train Data Size"
              value={ratioOfTrain}
              onChange={(event) => {
                setRatioOfTrain(event.target.value);
              }}
            ></input>
          </div>
          <div className="modelcard-column">
            <div className="modelcard-column-name">Look Back Day</div>
            <input
              disabled={isDisabled}
              className="modelcard-input"
              placeholder="Look Back Day"
              value={lookBack}
              onChange={(event) => {
                setlookBack(event.target.value);
              }}
            ></input>
          </div>
          <div className="modelcard-column">
            <div className="modelcard-column-name">Learning Rate</div>
            <input
              disabled={isDisabled}
              className="modelcard-input"
              placeholder="Learning Rate"
              value={learnRate}
              onChange={(event) => {
                setLearnRate(event.target.value);
              }}
            ></input>
          </div>
          <div className="modelcard-column">
            <div className="modelcard-column-name">Epoch</div>
            <input
              disabled={isDisabled}
              className="modelcard-input"
              placeholder="Epoch"
              value={epoch}
              onChange={(event) => {
                setEpoch(event.target.value);
              }}
            ></input>
          </div>
          <div className="modelcard-column">
            <div className="modelcard-column-name">Batch Size</div>
            <input
              disabled={isDisabled}
              className="modelcard-input"
              placeholder="Batch Size"
              value={batchSize}
              onChange={(event) => {
                setBatchSize(event.target.value);
              }}
            ></input>
          </div>
        </form>
        <div className="modelcard-func-container">
          <button
            className="modelcard-func-btn  modelcard-green-btn"
            onClick={() => {
              setIsDisabled(false);
              if (isEdit === true) {
                editModel();
                console.log('edited');
                setIsDisabled(!isDisabled);

                setIsEdit(false);
              } else {
                setIsEdit(true);
              }
            }}
          >
            {isEdit ? 'Save' : 'Edit'}
          </button>
          <button
            className="modelcard-func-btn modelcard-red-btn"
            onClick={() => {
              deleteModel();
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModelCard;
