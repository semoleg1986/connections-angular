import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LogService } from '../../services/log.service';
import { IAuthResponse, ILogForm } from '../../models/log.interface';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
    isSubmitting = false;

    logForm = this.fb.group({
        email: ['', [
            Validators.required,
            Validators.email,
        ]],
        password: ['', [
            Validators.required,
        ]],
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private logService: LogService,
        private toastService: ToastService,
    ) {}

    get email() {
        return this.logForm.get('email');
    }

    get password() {
        return this.logForm.get('password');
    }

    public login(): void {
        if (this.logForm.invalid) {
            return;
        }

        this.isSubmitting = true;

        const logData = this.prepareLogData();

        this.logService.logUser(logData).subscribe({
            next: (value) => {
                this.router.navigate(['/']);
                this.handleAuthSuccess(value);
            },
            error: (error) => {
                this.handleAuthError(error);
            },
        });
    }

    private prepareLogData(): ILogForm {
        const { email, password } = this.logForm.value;

        return {
            email: email ?? '',
            password: password ?? '',
        };
    }

    private handleAuthSuccess(value: IAuthResponse): void {
        this.isSubmitting = false;
        localStorage.setItem('userData', JSON.stringify(this.prepareAuthData(value)));
        this.toastService.showSuccess('Authentication successful!');
        this.logForm.reset();
    }

    private prepareAuthData(values: IAuthResponse): IAuthResponse {
        const { token, uid } = values;
        const email = this.logForm.value ? this.logForm.value.email : '';
        return { token, uid, email };
    }

    private handleAuthError(error: HttpErrorResponse): void {
        this.isSubmitting = false;
        switch (error.error.type) {
            case 'InvalidFormDataException':
                this.handleInvalidFormDataError(error.error.message);
                break;
            case 'NotFoundException':
                this.handleNotFoundException(error.error.message);
                break;
            default:
                this.toastService.showError('An error occurred. Please try again.');
                break;
        }
    }

    private handleInvalidFormDataError(errorMessage: string): void {
        if (errorMessage.includes('Parameters')) {
            this.handleFormDataRequired(errorMessage);
        } else {
            this.toastService.showError(errorMessage);
        }
    }

    private handleFormDataRequired(error: string): void {
        this.email?.setErrors({ taken: true });
        this.password?.setErrors({ taken: true });
        this.toastService.showError(error);
    }

    private handleNotFoundException(error: string): void {
        this.email?.setErrors({ taken: true });
        this.password?.setErrors({ taken: true });
        this.toastService.showError(error);
    }
}
