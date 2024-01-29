import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS_PEOPLE_DIALOG } from 'src/app/api/endpoints';
import { map } from 'rxjs';
import { IMessagesData } from '../models/group.interface';

@Injectable({
    providedIn: 'root',
})
export class PeopleMessagesService {
    private getGroupMessagesApi = API_ENDPOINTS_PEOPLE_DIALOG.getMessages;

    private sendGroupMessagesApi = API_ENDPOINTS_PEOPLE_DIALOG.sendMessage;

    private deleteGroupMessagesApi = API_ENDPOINTS_PEOPLE_DIALOG.deleteMessage;

    constructor(
        private http: HttpClient,
    ) { }

    getMessages(conversationID: string, since?: number) {
        let params = new HttpParams().set('conversationID', conversationID);

        if (since) {
            params = params.append('since', since.toString());
        }

        return this.http.get<IMessagesData>(this.getGroupMessagesApi, { params }).pipe(
            map((data: IMessagesData) => data.Items),
        );
    }

    sendMessage(conversationID: string, message: string) {
        const body = { conversationID, message };

        return this.http.post(this.sendGroupMessagesApi, body);
    }

    deleteMessage(conversationID: string, messageID: string) {
        const params = new HttpParams().set('conversationID', conversationID).set('messageID', messageID);

        return this.http.delete(this.deleteGroupMessagesApi, { params });
    }
}
