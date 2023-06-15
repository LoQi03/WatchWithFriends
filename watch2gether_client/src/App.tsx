import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Asd</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
