import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as CommonSrtyles from './commonStyles';
import { Navbar } from './components/navbar/navbar';
import { AuthenticationPage } from './pages/authentication/authentication';
import { FriendsPage } from './pages/friends/friends';
import { HomePage } from './pages/home/home';
import { ProfilePage } from './pages/profile/profile';
import { RoomsPage } from './pages/rooms/rooms';
import { AuthProvider, VerifyTokenHandler } from './services/authenticationContext';
import { RoomPageWithProvider } from './pages/room/room-with-provider';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const [isUserAlreadyLoggedIn, setIsUserAlreadyLoggedIn] = React.useState(false);

  const isUserAlreadyLoggedInChangeHandler = () => {
    setIsUserAlreadyLoggedIn(prev => !prev);
  };

  const verifyTokenHandler = () => {
    setIsUserAlreadyLoggedIn(true);
  };

  return (
    <AuthProvider isUserAlreadyLoggedInChangeHandler={isUserAlreadyLoggedInChangeHandler}>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <VerifyTokenHandler isUserAlreadyLoggedIn={isUserAlreadyLoggedIn} verifyTokenHandler={verifyTokenHandler} />
      {
        isUserAlreadyLoggedIn ?
          <BrowserRouter>
            <Navbar />
            <CommonSrtyles.PageContainer>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/room/:id" element={<RoomPageWithProvider />} />
              </Routes>
            </CommonSrtyles.PageContainer>
          </BrowserRouter>
          : <AuthenticationPage />
      }
    </AuthProvider>

  );
}

export default App;


