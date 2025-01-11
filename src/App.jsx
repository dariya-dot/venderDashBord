import React from 'react';
import Landingpage from './dashbord/pages/Landingpage';
import "./App.css"
import { Routes,Route } from 'react-router-dom';
import Notfound from './dashbord/components/forms/Notfound';
const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Landingpage/>} />
      <Route path='/*' element={<Notfound/>} />
    </Routes>
  )
}

export default App