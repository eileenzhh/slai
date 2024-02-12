import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main'
import PreviewImage from './pages/PreviewImage';
import Results from './pages/Results';
import { StageProvider } from './app-context/stage-context';


function App() {

  return (
    <BrowserRouter>
    <StageProvider>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='preview-image' element={<PreviewImage />} />
        <Route path='results' element={<Results />} />
      </Routes>
      </StageProvider>
    </BrowserRouter>
  );
}

export default App;
