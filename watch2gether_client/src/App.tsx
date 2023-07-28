import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNavbar from './components/side-navbar/sideNavbar';
import { HomePage } from './pages/home/home';
import { RoomsPage } from './pages/rooms/rooms';
import { ProfilePage } from './pages/profile/profile';
import { FriendsPage } from './pages/friends/friends';
import * as CommonSrtyles from './commonStyles';
import { AuthProvider, VerifyTokenHandler } from './services/authenticationContext';
import { AuthenticationPage } from './pages/authentication/authentication';
import { RoomPage } from './pages/room/room';
import CookieConsent from 'react-cookie-consent';




function App(): JSX.Element {
  const [isUserAlreadyLoggedIn, setIsUserAlreadyLoggedIn] = React.useState(false);

  const isUserAlreadyLoggedInChangeHandler = () => {
    setIsUserAlreadyLoggedIn(prev => !prev);
  };
  const verifyTokenHandler = () => {
    setIsUserAlreadyLoggedIn(true);
  };

  return (
    <AuthProvider isUserAlreadyLoggedInChangeHandler={isUserAlreadyLoggedInChangeHandler}>
      {
        isUserAlreadyLoggedIn ?
          <BrowserRouter>
            <SideNavbar />
            <CommonSrtyles.PageContainer>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/room/:id" element={<RoomPage />} />
              </Routes>
            </CommonSrtyles.PageContainer>
          </BrowserRouter>
          : <AuthenticationPage />
      }
      <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
      <VerifyTokenHandler isUserAlreadyLoggedIn={isUserAlreadyLoggedIn} verifyTokenHandler={verifyTokenHandler} />
    </AuthProvider>

  );
}

export default App;


