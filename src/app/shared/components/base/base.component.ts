import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogService } from 'src/app/auth/services/log.service';
import { resetStore } from 'src/app/redux/actions/clear.action';
import { deleteProfile } from 'src/app/redux/actions/profile/profile.action';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
    loggedIn = false;

    constructor(
        private logService: LogService,
        private store: Store,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.checkLoggedInStatus();
    }

    private checkLoggedInStatus() {
        this.loggedIn = this.logService.isLoggedIn();
        this.logService.isLoggedIn$.subscribe((loggedInStatus) => {
            this.loggedIn = loggedInStatus;
        });
    }

    private resetStore() {
        this.store.dispatch(resetStore());
    }

    public logout() {
        this.store.dispatch(deleteProfile());
        this.resetStore();
    }
}
