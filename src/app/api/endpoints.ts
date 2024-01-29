export const API_ENDPOINTS = {
    register: 'https://tasks.app.rs.school/angular/registration',
    login: 'https://tasks.app.rs.school/angular/login',
    logout: 'https://tasks.app.rs.school/angular/logout',
    profile: 'https://tasks.app.rs.school/angular/profile',
};

export const API_ENDPOINTS_GROUP = {
    grouplist: 'https://tasks.app.rs.school/angular/groups/list',
    creategroup: 'https://tasks.app.rs.school/angular/groups/create',
    deletegroup: 'https://tasks.app.rs.school/angular/groups/delete',
};

export const API_ENDPOINTS_CHAT = {
    chatlist: 'https://tasks.app.rs.school/angular/users',
    conversationList: 'https://tasks.app.rs.school/angular/conversations/list',
    createConv: 'https://tasks.app.rs.school/angular/conversations/create',
};

export const API_ENDPOINTS_GROUP_DIALOG = {
    getMessages: 'https://tasks.app.rs.school/angular/groups/read',
    sendMessage: 'https://tasks.app.rs.school/angular/groups/append',
};

export const API_ENDPOINTS_PEOPLE_DIALOG = {
    getMessages: 'https://tasks.app.rs.school/angular/conversations/read',
    sendMessage: 'https://tasks.app.rs.school/angular/conversations/append',
    deleteMessage: 'https://tasks.app.rs.school/angular/conversations/delete?conversationID={:conversationID}',
};
