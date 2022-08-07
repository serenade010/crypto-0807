import React from 'react';
import './NewsCard.css';

function NewsCard(props) {
  return (
    <div className="NewsCard">
      <div className="ewscard-component-container">
        <div className="ewscard-img-container">
          <img
            src={props.urlToImage}
            alt="news"
            width="200px"
            height="150px"
          ></img>
        </div>
        <div className="newscard-text-container">
          <div className="NewsCard-title"> {props.title}</div>
          <div className="NewsCard-author"> {props.author}</div>
          <div className="NewsCard-description"> {props.description}</div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
