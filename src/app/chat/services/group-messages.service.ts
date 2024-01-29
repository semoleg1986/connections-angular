import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS_GROUP_DIALOG } from 'src/app/api/endpoints';
import { map } from 'rxjs';
import { IMessagesData } from '../models/group.interface';

@Injectable({
    providedIn: 'root',
})
export class GroupMessagesService {
    private getGroupMessagesApi = API_ENDPOINTS_GROUP_DIALOG.getMessages;

    private sendGroupMessagesApi = API_ENDPOINTS_GROUP_DIALOG.sendMessage;

    constructor(
        private http: HttpClient,
    ) { }

    getGroupList(groupID: string, since?: number) {
        let params = new HttpParams().set('groupID', groupID);

        if (since) {
            params = params.append('since', since.toString());
        }

        return this.http.get<IMessagesData>(this.getGroupMessagesApi, { params }).pipe(
            map((data: IMessagesData) => data.Items),
        );
    }

    sendGroupMessage(groupID: string, message: string) {
        const body = { groupID, message };

        return this.http.post(this.sendGroupMessagesApi, body);
    }
}
