import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './component/Homepage.jsx';
import Register from './component/Register.jsx';
import Login from './component/Login.jsx';
import UploadDoc from './component/UploadDoc.jsx';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage('en');
  },[])
  function handleChangelanguage(e) {
    if (e.target.textContent === 'Eng') {
      i18n.changeLanguage('en');
    } else if (e.target.textContent === 'Fr') {
      i18n.changeLanguage('fr');
    } else {
      i18n.changeLanguage('eng');
    }

    useEffect(() => {
      handleChangelanguage();
    }, []);
  }
  return (
    <>
      <div className="absolute top-2 right-12 text-purple-50 bg-slate-800 px-2 rounded-md py-1 cursor-pointer">
        <h3 onClick={handleChangelanguage} className="flex gap-1">
          <span>Eng</span> /<span>Fr</span>
        </h3>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/docs/upload" element={<UploadDoc />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
