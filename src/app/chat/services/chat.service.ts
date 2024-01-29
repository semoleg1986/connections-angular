import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS_CHAT } from 'src/app/api/endpoints';
import { IChat, IConversationList } from '../models/chat.interface';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private chatListApi = API_ENDPOINTS_CHAT.chatlist;

    private convListApi = API_ENDPOINTS_CHAT.conversationList;

    private convCreateApi = API_ENDPOINTS_CHAT.createConv;

    constructor(
        private http: HttpClient,
    ) { }

    getChatList(): Observable<IChat> {
        return this.http.get<IChat>(this.chatListApi);
    }

    getConvList(): Observable<IConversationList> {
        return this.http.get<IConversationList>(this.convListApi);
    }

    createConversation(companion: string): Observable<{ conversationID: string }> {
        const requestBody = { companion };
        return this.http.post<{ conversationID: string }>(this.convCreateApi, requestBody);
    }
}
