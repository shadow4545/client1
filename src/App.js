import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from './Pages/Index.js';
import Manager from './Pages/Manager.js';
import AddSinhvien from './Pages/AddSinhvien.js';
import DetailSinhvien from './Pages/DetailSinhvien.js';
import EditSinhvien from './Pages/EditSinhvien.js';
import Activity from './Pages/Activity.js';



function App() {
  const [sinhvien, setSinhvien] = useState([]);

  const handleAddSinhvien = (newSV) => {
    setSinhvien(prev => [...prev, newSV]);
  };

  const handleUpdateSinhvien = (index, updatedSV) => {
    const updatedList = [...sinhvien];
    updatedList[index] = updatedSV;
    setSinhvien(updatedList);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/manager" element={<Manager sinhvien={sinhvien} />} />
        <Route path="/add-sinhvien" element={<AddSinhvien onAdd={handleAddSinhvien} />} />
        <Route path="/detail/:id" element={<DetailSinhvien sinhvien={sinhvien} />} />
         <Route path="/Activity" element={<Activity />} />
        <Route
          path="/edit/:id"
          element={
            <EditSinhvien
              sinhvien={sinhvien}
              onUpdate={handleUpdateSinhvien}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
