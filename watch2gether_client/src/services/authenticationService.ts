import { UserDto } from "../models/userDto";
import * as API from "../api/userManagementAPI";
import { LoginCredentialsDto } from "../models/loginCredentialsDto";
import { RegisterUserDto } from "../models/registerUserDto";
import jwtDecode from 'jwt-decode'
import { WebToken } from "../models/webToken";

export default class AuthenticationService {
    private static _isUserAlreadyLoggedIn: boolean;
    public static get isUserAlreadyLoggedIn(): boolean {
        return this._isUserAlreadyLoggedIn;
    }

    private static _currentUser?: UserDto;
    public static get currentUser(): UserDto | undefined {
        return this._currentUser;
    }
    public static set currentUser(value: UserDto | undefined) {
        this._currentUser = value;
    }

    private static _token?: string;
    public static get token(): string {
        return this.token;
    }
    public static set token(value: string) {
        this._token = value;
    }

    public static async login(credentials: LoginCredentialsDto): Promise<void> {
        const { userDetails, token } = await API.login(credentials);
        if (!userDetails || !token) {
            throw new Error("Invalid response from server");
        }
        this._currentUser = userDetails;
        this._token = token;
        localStorage.setItem("token", this._token);
        this._isUserAlreadyLoggedIn = true;
    }
    public static async register(user: RegisterUserDto): Promise<void> {
        const status = await API.register(user);
        if (status !== 200) {
            throw new Error("Invalid response from server");
        }
    }
    public static async verifyToken(token: string): Promise<void> {
        const response = await API.getUserByToken(token);
        if (!response) {
            this.logout();
            throw new Error("Invalid response from server");
        }
        this._currentUser = response;
        this._isUserAlreadyLoggedIn = true;
    }
    public static logout(): Promise<void> {
        return new Promise((resolve) => {
            this._currentUser = undefined;
            this._token = undefined;
            localStorage.removeItem("token");
            this._isUserAlreadyLoggedIn = false;
            resolve();
        });
    }
    public static checkTokenExpiration(): boolean {
        const token = localStorage.getItem("token");
        if (!token) return false;

        const decodedToken = jwtDecode<WebToken>(token);
        const expirationDate = new Date(decodedToken.exp * 1000);

        const currentDate = new Date();
        if (expirationDate < currentDate) {
            this.logout();
            return false;
        }
        return true;
    }
}