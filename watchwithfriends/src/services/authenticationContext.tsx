import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Loader } from '../components/loader/loader';
import { UsersApi } from '../api';
import { UserDTO } from '../api';


interface AuthContextType {
    currentUser: UserDTO | null;
    isUserAlreadyLoggedIn: boolean;
    login: (credentials: UserDTO) => Promise<void>;
    register: (user: UserDTO) => Promise<void>;
    verifyToken: () => Promise<void>;
    logout: () => Promise<void>;
    changeUserDetails: (userDetails: UserDTO) => void;
    changeUserIsAlreadyLoggedIn: (isAlreadyLoggedIn: boolean) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<UserDTO | null>(null);
    const [isUserAlreadyLoggedIn, setIsUserAlreadyLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userAPI = new UsersApi();
    const login = async (credentials: UserDTO): Promise<void> => {
        try {
            setIsLoading(true);
            const { data, status } = await userAPI.login(credentials, { withCredentials: true });
            if (status !== 200) {
                setIsLoading(false);
                throw new Error("Invalid response from server");
            }
            setCurrentUser(data);
            setIsLoading(false);
            setIsUserAlreadyLoggedIn(true);
        }
        catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    const register = async (user: UserDTO): Promise<void> => {
        setIsLoading(true);
        try {
            const {status} = await userAPI.register(user);
            if (status !== 200) {
                setIsLoading(false);
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
        setIsLoading(false);
    };

    const verifyToken = async (): Promise<void> => {
        try {
            const { status , data } = await userAPI.getUserByToken({ withCredentials: true });
            if(status !== 200) throw new Error("Invalid response from server");
            setCurrentUser(data);
            setIsUserAlreadyLoggedIn(true);
        } catch (error) {
            console.log(error);
            await logout();
        }
    };

    const logout = async (): Promise<void> => {
        await userAPI.logout();
        setCurrentUser(null);
        setIsUserAlreadyLoggedIn(false);
    };
    const changeUserDetails = (userDetails: UserDTO): void => {
        setCurrentUser(userDetails);
    }
    const changeUserIsAlreadyLoggedIn = (isAlreadyLoggedIn: boolean): void => {
        setIsUserAlreadyLoggedIn(isAlreadyLoggedIn);
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isUserAlreadyLoggedIn,
                login,
                register,
                verifyToken,
                logout,
                changeUserDetails,
                changeUserIsAlreadyLoggedIn
            }}
        >
            {isLoading && <Loader />}
            {children}
        </AuthContext.Provider>
    );
};


export const VerifyTokenHandler: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {

        const verifyTokenHandler = async () => {
            setIsLoading(true);
            await authContext?.verifyToken();
            setIsLoading(false);
        };
        if (authContext?.isUserAlreadyLoggedIn === false) {
            verifyTokenHandler();
        }
        
    }, []);
    return (isLoading && <Loader />);
};