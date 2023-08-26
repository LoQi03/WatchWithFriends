import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as CommonSrtyles from './commonStyles';
import SideNavbar from './components/side-navbar/sideNavbar';
import { AuthenticationPage } from './pages/authentication/authentication';
import { FriendsPage } from './pages/friends/friends';
import { HomePage } from './pages/home/home';
import { ProfilePage } from './pages/profile/profile';
import { RoomPage } from './pages/room/room';
import { RoomsPage } from './pages/rooms/rooms';
import { AuthProvider, VerifyTokenHandler } from './services/authenticationContext';

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
      <VerifyTokenHandler isUserAlreadyLoggedIn={isUserAlreadyLoggedIn} verifyTokenHandler={verifyTokenHandler} />
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
    </AuthProvider>

  );
}

export default App;

