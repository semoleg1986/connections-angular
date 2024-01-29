import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LogService } from '../services/log.service';

@Injectable({
    providedIn: 'root',
})
export class LoginGuardService {
    constructor(public auth: LogService, public router: Router) {}

    canActivate(): boolean {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}

export const LoginGuardGuard: CanActivateFn = () => inject(LoginGuardService).canActivate();
