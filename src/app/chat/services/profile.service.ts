import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/api/endpoints';
import { IUpdateProfile, IUserProfile } from '../models/profile.interface';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private profileApi = API_ENDPOINTS.profile;

    constructor(
        private http: HttpClient,
    ) { }

    getProfileData(): Observable<IUserProfile> {
        return this.http.get<IUserProfile>(this.profileApi);
    }

    updateProfileData(data: IUpdateProfile) {
        return this.http.put(this.profileApi, data);
    }
}
