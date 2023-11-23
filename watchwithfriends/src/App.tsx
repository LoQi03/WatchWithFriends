import React, { useRef, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as CommonStyles from './commonStyles';
import { Navbar } from './components/navbar/navbar';
import { AuthenticationPage } from './pages/authentication/authentication';
import { FriendsPage } from './pages/friends/friends';
import { HomePage } from './pages/home/home';
import { ProfilePage } from './pages/profile/profile';
import { RoomsPage } from './pages/rooms/rooms';
import { AuthContext, AuthProvider, VerifyTokenHandler } from './services/authenticationContext';
import { RoomPageWithProvider } from './pages/room/room-with-provider';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  return (
    <AuthProvider>
      <Toaster
        position={windowSize.current[0] < 800 ? 'top-center' : 'bottom-right'}
        containerStyle={{ zIndex: 9999 }}
        reverseOrder={false}
      />
      <BrowserRouter>
        <AuthContext.Consumer>
          {(context) => {
            if (context === null) {
              return null;
            }
            const { isUserAlreadyLoggedIn } = context;
            return (
              <>
                {isUserAlreadyLoggedIn ? <Navbar /> : null}
                <CommonStyles.PageContainer>
                  <VerifyTokenHandler />
                  <Routes>
                    <Route path="/" element={isUserAlreadyLoggedIn ? <HomePage /> : <AuthenticationPage />} />
                    {isUserAlreadyLoggedIn ? (
                      <>
                        <Route path="/rooms" element={<RoomsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/friends" element={<FriendsPage />} />
                        <Route path="/room/:id" element={<RoomPageWithProvider />} />
                      </>
                    ) : null}
                  </Routes>
                </CommonStyles.PageContainer>
              </>
            );
          }}
        </AuthContext.Consumer>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;