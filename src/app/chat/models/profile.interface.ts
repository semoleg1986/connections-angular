export interface IUserProfile {
    email: { S: string };
    name: { S: string };
    uid: { S: string };
    createdAt: { S: string };
}

export interface IUpdateProfile {
    name: string;
}
