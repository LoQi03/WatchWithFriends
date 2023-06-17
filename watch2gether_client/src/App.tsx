import React, { createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationPage } from './pages/authentication/authentication';
import AuthenticationService from './services/authenticationService';
import SideNavbar from './components/side-navbar/sideNavbar';
import { HomePage } from './pages/home/home';
import { RoomsPage } from './pages/rooms/rooms';
import { ProfilePage } from './pages/profile/profile';
import { FriendsPage } from './pages/friends/friends';
import * as CommonSrtyles from './commonStyles';


interface AppContextProps {
  logoutHandler: () => void;
  loginHandler: () => void;
}

export const AuthenticationContext = createContext<AppContextProps | undefined>(undefined);

function App(): JSX.Element {
  const [token, setToken] = React.useState<string>(localStorage.getItem('token') || '');
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState<boolean>(false);

  useEffect(() => {
    if (token === '') return;
    AuthenticationService.token = token;
    const verifyToken = async () => await AuthenticationService.verifyToken(token);
    verifyToken().then(() => setIsUserLoggedIn(true)).catch(() => setIsUserLoggedIn(false));
    setToken(token);
  }, [token]);

  const loginHandler = () => {
    setIsUserLoggedIn(AuthenticationService.isUserAlreadyLoggedIn);
  };

  const logoutHandler = () => {
    AuthenticationService.logout();
    setIsUserLoggedIn(false);
    setToken('');
  };

  return (
    <AuthenticationContext.Provider value={{ logoutHandler, loginHandler }}>
      {
        isUserLoggedIn ?
          <>
            <BrowserRouter>
              <SideNavbar />
              <CommonSrtyles.PageContainer>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/rooms" element={<RoomsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/friends" element={<FriendsPage />} />
                </Routes>
              </CommonSrtyles.PageContainer>
            </BrowserRouter>
          </>
          : <AuthenticationPage />
      }
    </AuthenticationContext.Provider >
  );
}

export default App;


