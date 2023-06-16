import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationPage } from './pages/authentication/authentication';
import AuthenticationService from './services/authenticationService';

function App() {
  return (
    <>
      {
        AuthenticationService.isUserAlreadyLoggedIn ?
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<>Asd</>} />
            </Routes>
          </BrowserRouter>
          : <AuthenticationPage />
      }
    </>
  );
}

export default App;
