import { UserDto } from "../models/userDto";
import * as API from "../api/UserManagementAPI";
import { LoginCredentialsDto } from "../models/loginCredentialsDto";
import { RegisterUserDto } from "../models/registerUserDto";

export default class AuthenticationService {
    constructor() {
        let token = localStorage.getItem("token");
        if (token) {
            AuthenticationService.getUserByToken(token);
        }
    }
    private static _isUserAlreadyLoggedIn: boolean;
    public static get isUserAlreadyLoggedIn(): boolean {
        return this._isUserAlreadyLoggedIn;
    }

    private static _currentUser?: UserDto;
    public static get currentUser(): UserDto | undefined {
        return this._currentUser;
    }

    private static _token?: string;
    public static get token(): string {
        return this.token;
    }

    public static async login(credentials: LoginCredentialsDto): Promise<void> {
        const response = await API.login(credentials);
        if (!response.user || !response.token) {
            throw new Error("Invalid response from server");
        }
        this._currentUser = response.user;
        this._token = response.token;
        localStorage.setItem("token", this._token);
        this._isUserAlreadyLoggedIn = true;
    }
    public static async register(user: RegisterUserDto): Promise<void> {
        const response = await API.register(user);
        if (!response.user) {
            throw new Error("Invalid response from server");
        }
    }
    public static async getUserByToken(token: string): Promise<void> {
        const response = await API.getUserByToken(token);
        if (!response) {
            this.logout();
            throw new Error("Invalid response from server");
        }
        this._currentUser = response;
        this._isUserAlreadyLoggedIn = true;
    }
    public static logout(): void {
        this._currentUser = undefined;
        this._token = undefined;
        localStorage.removeItem("token");
        this._isUserAlreadyLoggedIn = false;
    }
}