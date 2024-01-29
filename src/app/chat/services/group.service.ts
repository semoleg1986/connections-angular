import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS_GROUP } from 'src/app/api/endpoints';
import { Observable } from 'rxjs';
import { IGroupData } from '../models/group.interface';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    private groupListApi = API_ENDPOINTS_GROUP.grouplist;

    private createGroupApi = API_ENDPOINTS_GROUP.creategroup;

    private deleteGroupApi = API_ENDPOINTS_GROUP.deletegroup;

    constructor(
        private http: HttpClient,
    ) { }

    getGroupList(): Observable<IGroupData> {
        return this.http.get<IGroupData>(this.groupListApi);
    }

    createGroup(name: string): Observable<{ groupID: string }> {
        return this.http.post<{ groupID: string }>(this.createGroupApi, { name });
    }

    deleteGroup(groupID: string): Observable<string> {
        const params = new HttpParams().set('groupID', groupID);
        const options = { params };
        return this.http.delete<string>(this.deleteGroupApi, options);
    }
}
