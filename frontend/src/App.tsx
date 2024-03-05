import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TakeImage from './pages/TakeImage'
import PreviewImage from './pages/PreviewImage';
import Results from './pages/Results';
import { StageProvider } from './app-context/stage-context';
import Home from './pages/Home';
import Header from './components/Header';
import Export from './pages/Export';


function App() {

  return (
    <BrowserRouter>
    <StageProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='take-image' element={<TakeImage/>} />
        <Route path='preview-image' element={<PreviewImage />} />
        <Route path='results' element={<Results />} />
        <Route path='export' element={<Export />} />
      </Routes>
      </StageProvider>
    </BrowserRouter>
  );
}

export default App;
