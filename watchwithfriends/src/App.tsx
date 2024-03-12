import React, { useRef } from 'react';
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
import { setAxiosConfig } from './AppConfig';
import * as AppConfig from './AppConfig';
const App: React.FC = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  setAxiosConfig(AppConfig.getConfig().apiUrl);
  return (
    <AuthProvider>
      <Toaster
        position={windowSize.current[0] < 800 ? 'top-center' : 'bottom-right'}
        containerStyle={{ zIndex: 9999 }}
        reverseOrder={false}
      />
      <VerifyTokenHandler />
      <AuthContext.Consumer>
        {(context) => {
          if (context === null) {
            return null;
          }
          const { isUserAlreadyLoggedIn } = context;
          return (
            <>
              {isUserAlreadyLoggedIn ?
                <>
                  <BrowserRouter>
                    <Navbar />
                    <CommonStyles.PageContainer>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/friends" element={<FriendsPage />} />
                        <Route path="/rooms" element={<RoomsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/room/:id" element={<RoomPageWithProvider />} />
                      </Routes>
                    </CommonStyles.PageContainer>
                  </BrowserRouter>
                </> : <AuthenticationPage />}
            </>
          );
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

export default App;