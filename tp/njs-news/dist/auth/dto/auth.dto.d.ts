export declare class LoginRequest {
    username: string;
    password: string;
    constructor(username?: string, password?: string);
}
export declare class LoginResponse {
    username: string;
    message: string;
    status: boolean;
    token: string | null;
    scope: string | null;
    constructor(username?: string);
}
