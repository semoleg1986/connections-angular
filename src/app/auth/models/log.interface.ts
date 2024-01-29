export interface ILogForm {
    email: string;
    password: string;
}

export interface IAuthResponse {
    token?: string;
    uid?: string;
    email?: string | null;
}
