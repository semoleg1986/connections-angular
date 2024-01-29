export interface IChat {
    Count: number;
    Items: IChatItem[];
}

export interface IChatItem {
    name: {
        S: string;
    };
    uid: {
        S: string;
    };
}

export interface IConversationList {
    Count: number;
    Items: IConversationItem[];
}

export interface IConversationItem {
    id: {
        S: string;
    };
    companionID: {
        S: string;
    };
}
