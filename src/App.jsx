import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
import CheckOutPage from './pages/CheckOutPage';
import AddItemPage from './pages/AddItemPage';
import Navbar from './component /Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/items' element={<ItemsPage />} />
        <Route path='/checkout' element={<CheckOutPage />} />
        <Route path='/add' element={<AddItemPage />} />
      </Routes>
    </div>
  );
};

export default App;