import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main'
import PreviewImage from './pages/PreviewImage';
import Results from './pages/Results';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path='preview-image' element={<PreviewImage />} />
      <Route path='results' element={<Results />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
