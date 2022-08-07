import React, { useState } from 'react';
import './New.css';
import Navbar from '../Components/Navbar';
import newsJSON from '../Components/news.json';
import NewsCard from '../Components/NewsCard';

function News() {
  const [news, setNews] = useState(newsJSON.articles);

  return (
    <div className="news-container">
      <Navbar />
      <div className="newscard-container">
        {news.map((n) => {
          return (
            <NewsCard
              key={n.title + n.description}
              title={n.title}
              author={n.author}
              description={n.description}
              urlToImage={n.urlToImage}
            />
          );
        })}
      </div>
    </div>
  );
}

export default News;
