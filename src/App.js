import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Account from './Account';
import Model from './Pages/Model';
import News from './Pages/News';
import Price from './Pages/Price';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Account />} />
        <Route path="/model" element={<Model />} />
        <Route path="/news" element={<News />} />
        <Route path="/price" element={<Price />} />
      </Routes>
    </>
  );
}

export default App;
