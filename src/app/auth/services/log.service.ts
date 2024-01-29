import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/api/endpoints';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserProfile } from 'src/app/chat/models/profile.interface';
import { ILogForm } from '../models/log.interface';

@Injectable({
    providedIn: 'root',
})
export class LogService {
    private logApi = API_ENDPOINTS.login;

    private logoutApi = API_ENDPOINTS.logout;

    public loggedIn$ = new BehaviorSubject<boolean>(false);

    get isLoggedIn$() {
        return this.loggedIn$.asObservable();
    }

    constructor(
        private http: HttpClient,
    ) { }

    logUser(value: ILogForm) {
        const { email, password } = value;

        const body = { email, password };

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(this.logApi, body, { headers });
    }

    isLoggedIn(): boolean {
        const userDataString = localStorage.getItem('userData');

        if (userDataString) {
            this.loggedIn$.next(true);
            const userData = JSON.parse(userDataString);
            const { token } = userData;
            return !!token;
        }

        return false;
    }

    updateLoggedInStatus() {
        this.loggedIn$.next(this.isLoggedIn());
    }

    logoutUser(): Observable<IUserProfile> {
        this.loggedIn$.next(false);
        return this.http.delete<IUserProfile>(this.logoutApi);
    }
}
