import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { UserDto } from '../models/userDto';
import { LoginCredentialsDto } from '../models/loginCredentialsDto';
import { RegisterUserDto } from '../models/registerUserDto';
import * as API from '../api/userManagementAPI';
import { Loader } from '../components/loader/loader';


interface AuthContextType {
    currentUser: UserDto | null;
    isUserAlreadyLoggedIn: boolean;
    login: (credentials: LoginCredentialsDto) => Promise<void>;
    register: (user: RegisterUserDto) => Promise<void>;
    verifyToken: () => Promise<void>;
    logout: () => Promise<void>;
    changeUserDetails: (userDetails: UserDto) => void;
    changeUserIsAlreadyLoggedIn: (isAlreadyLoggedIn: boolean) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<UserDto | null>(null);
    const [isUserAlreadyLoggedIn, setIsUserAlreadyLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (credentials: LoginCredentialsDto): Promise<void> => {
        try {
            setIsLoading(true);
            const { data, status } = await API.login(credentials)
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

    const register = async (user: RegisterUserDto): Promise<void> => {
        setIsLoading(true);
        try {
            const status = await API.register(user);
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
            const { data } = await API.getUserByToken();
            console.log(data);
            setCurrentUser(data);
            setIsUserAlreadyLoggedIn(true);
        } catch (error) {
            await logout();
        }
    };

    const logout = async (): Promise<void> => {
        await API.logout();
        setCurrentUser(null);
        setIsUserAlreadyLoggedIn(false);
    };
    const changeUserDetails = (userDetails: UserDto): void => {
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