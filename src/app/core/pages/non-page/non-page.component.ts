import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-non-page',
    templateUrl: './non-page.component.html',
    styleUrls: ['./non-page.component.scss'],
})
export class NonPageComponent implements OnInit {
    errorMessage = "Sorry, the requested URL doesn't exist.";

    constructor(
        private route: ActivatedRoute,
        private toastService: ToastService,
    ) {}

    ngOnInit() {
        this.subscribeToUrl();
    }

    private subscribeToUrl() {
        this.route.url.subscribe((url) => {
            if (url.length > 0) {
                this.errorMessage = `Sorry, the requested URL - ${url} doesn't exist.`;
                this.toastService.showError(this.errorMessage);
            }
        });
    }
}
