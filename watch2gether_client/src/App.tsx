import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationPage } from './pages/authentication/authentication';
import AuthenticationService from './services/authenticationService';

function App() {
  const [token, setToken] = React.useState<string>(localStorage.getItem('token') || '');
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState<boolean>(false);
  useEffect(() => {
    if (token === '') return;
    AuthenticationService.token = token;
    const verifyToken = async () => await AuthenticationService.verifyToken(token);
    verifyToken().then(() => setIsUserLoggedIn(true)).catch(() => setIsUserLoggedIn(false));
    setToken(token);
  }, [token]);

  const loginChangeHandler = () => {
    setIsUserLoggedIn(AuthenticationService.isUserAlreadyLoggedIn);
  };


  return (
    <>
      {
        isUserLoggedIn ?
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<>Asd</>} />
            </Routes>
          </BrowserRouter>
          : <AuthenticationPage loginChangeHandler={loginChangeHandler} />
      }
    </>
  );
}

export default App;


