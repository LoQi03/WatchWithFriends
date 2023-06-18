export interface WebToken {
    aud: string;
    email: string;
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    nbf: number;
    sub: string;
}