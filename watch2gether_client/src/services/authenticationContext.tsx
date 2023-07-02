import React, { createContext, useState, ReactNode, useContext, useMemo, useCallback } from 'react';
import { UserDto } from '../models/userDto';
import { LoginCredentialsDto } from '../models/loginCredentialsDto';
import { RegisterUserDto } from '../models/registerUserDto';
import * as API from '../api/userManagementAPI';
import { WebToken } from '../models/webToken';
import jwtDecode from 'jwt-decode';

interface AuthContextType {
    currentUser: UserDto | null;
    token: string | null;
    isUserAlreadyLoggedIn: boolean;
    login: (credentials: LoginCredentialsDto) => Promise<void>;
    register: (user: RegisterUserDto) => Promise<void>;
    verifyToken: () => Promise<boolean>;
    logout: () => Promise<void>;
    checkTokenExpiration: () => boolean;
    changeUserDetails: (userDetails: UserDto) => void;
    changeUserIsAlreadyLoggedIn: (isAlreadyLoggedIn: boolean) => void;
}

interface AuthProviderProps {
    isUserAlreadyLoggedInChangeHandler: () => void;
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({
    isUserAlreadyLoggedInChangeHandler,
    children
}: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<UserDto | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isUserAlreadyLoggedIn, setIsUserAlreadyLoggedIn] = useState(false);

    const login = async (credentials: LoginCredentialsDto): Promise<void> => {

        const { userDetails, token } = await API.login(credentials);
        if (!userDetails || !token) {
            throw new Error("Invalid response from server");
        }
        setCurrentUser(userDetails);
        setToken(token);
        localStorage.setItem("token", token);
        setIsUserAlreadyLoggedIn(true);
        isUserAlreadyLoggedInChangeHandler();

    };

    const register = async (user: RegisterUserDto): Promise<void> => {

        const status = await API.register(user);
        if (status !== 200) {
            throw new Error("Invalid response from server");
        }
    };

    const verifyToken = async (): Promise<boolean> => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return false;
            const response = await API.getUserByToken(token);
            if (!response) {
                await logout();
                throw new Error("Invalid response from server");
            }
            setCurrentUser(response);
            return true;
        } catch (error) {
            return false;
        }
    };

    const logout = async (): Promise<void> => {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem("token");
        setIsUserAlreadyLoggedIn(false);
        window.location.reload();
    };

    const checkTokenExpiration = (): boolean => {
        const token = localStorage.getItem("token");
        if (!token) return false;

        const decodedToken = jwtDecode<WebToken>(token);
        const expirationDate = new Date(decodedToken.exp * 1000);

        const currentDate = new Date();
        if (expirationDate < currentDate) {
            logout();
            return false;
        }
        return true;
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
                token,
                isUserAlreadyLoggedIn,
                login,
                register,
                verifyToken,
                logout,
                checkTokenExpiration,
                changeUserDetails,
                changeUserIsAlreadyLoggedIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export interface VerifyTokenHandlerProps {
    verifyTokenHandler: () => void;
    isUserAlreadyLoggedIn: boolean;
}
export const VerifyTokenHandler = (props: VerifyTokenHandlerProps): null => {
    const [isTokenVerified, setIsTokenVerified] = useState(false);
    const authContext = useContext(AuthContext);


    const checkTokenExpiration = useCallback(async (): Promise<boolean> => {
        if (isTokenVerified) return true;
        let result = await authContext?.verifyToken();
        if (!result) {
            return false;
        }
        return result;
    }, [authContext, isTokenVerified]);


    useMemo(() => {

        const verifyTokenAsync = async () => {
            var result = await checkTokenExpiration();
            if (result && !isTokenVerified) {
                setIsTokenVerified(true);
                props.verifyTokenHandler();
            }
        };

        verifyTokenAsync();
    }, [props, isTokenVerified, checkTokenExpiration]);


    return null;
};