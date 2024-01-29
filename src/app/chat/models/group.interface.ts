export interface IGroupData {
    Count: string;
    Items: IGroupItem[];
}

export interface IGroupItem {
    id: {
        S: string;
    };
    name: {
        S: string;
    };
    createdAt: {
        S: string;
    };
    createdBy: {
        S: string;
    };
}

export interface ICreateGroupResponse {
    groupID: string
}

export interface IMessageItem {
    authorID: {
        S: string;
    };
    message: {
        S: string;
    };
    createdAt: {
        S: string;
    };
}

export interface IMessagesData {
    Count: string;
    Items: IMessageItem[];
}
