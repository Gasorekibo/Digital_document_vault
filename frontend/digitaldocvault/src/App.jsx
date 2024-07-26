import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './component/Homepage.jsx';
import Register from './component/Register.jsx';
import Login from './component/Login.jsx';
import UploadDoc from './component/UploadDoc.jsx';
import Navigation from './component/Navigation.jsx';
function App() {
  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/docs/upload" element={<UploadDoc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
