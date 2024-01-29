import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/api/endpoints';
import { IRegForm } from '../models/reg.interface';

@Injectable({
    providedIn: 'root',
})
export class RegService {
    private regApi = API_ENDPOINTS.register;

    constructor(
        private http: HttpClient,
    ) { }

    regUser(value: IRegForm) {
        const { name, email, password } = value;

        const body = { name, email, password };

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(this.regApi, body, { headers });
    }
}
