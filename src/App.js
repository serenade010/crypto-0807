import './App.css';
import { Route, Routes } from 'react-router-dom';
// import Home from './Home';
import Account from './Account';
import Model from './Pages/Model';
import Predict from './Pages/Predict';
import Price from './Pages/Price';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/model" element={<Model />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/price" element={<Price />} />
      </Routes>
    </>
  );
}

export default App;
