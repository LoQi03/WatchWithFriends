import { UserDto } from "../models/userDto";


export default class AuthenticationService {
    private static _isUserAlreadyLoggedIn: boolean;
    public static get isUserAlreadyLoggedIn(): boolean {
        return this._isUserAlreadyLoggedIn;
    }

    private static _currentUser: UserDto;
    public static get currentUser(): UserDto {
        return this._currentUser;
    }

    private static _token: string;
    public static get token(): string {
        return this.token;
    }
}