import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TakeImage from './pages/TakeImage'
import PreviewImage from './pages/PreviewImage';
import Results from './pages/Results';
import { StageProvider } from './app-context/stage-context';
import Home from './pages/Home';
import Header from './components/Header';
import Export from './pages/Export';
import LoginPage from './pages/LoginPage';


function App() {

  return (
    <BrowserRouter>
    <StageProvider>
    {window.location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path='/login' element={<LoginPage />} />
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
