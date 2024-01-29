import { Component } from '@angular/core';
import {
    AbstractControl, FormBuilder, ValidationErrors, Validators,
} from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegService } from '../../services/reg.service';
import { IRegForm } from '../../models/reg.interface';
import { passwordValidator } from '../../validators/password.validators';

const namePattern = /^[\p{L} ]+$/u;

@Component({
    selector: 'app-reg-page',
    templateUrl: './reg-page.component.html',
    styleUrls: ['./reg-page.component.scss'],
})
export class RegPageComponent {
    duplicateEmails: string[] = [];

    isSubmitting = false;

    private emailValidator = (control: AbstractControl): ValidationErrors | null => {
        const email = control.value as string;
        return this.duplicateEmails.includes(email) ? { taken: true } : null;
    };

    regForm = this.fb.group({
        name: ['', [
            Validators.required,
            Validators.pattern(namePattern),
            Validators.maxLength(40),
        ]],
        email: ['', [
            Validators.required,
            Validators.email,
            this.emailValidator,
        ]],
        password: ['', [
            Validators.required,
            Validators.minLength(8),
            passwordValidator(),
        ]],
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private regService: RegService,
        private toastService: ToastService,
    ) {}

    get name() {
        return this.regForm.get('name');
    }

    get email() {
        return this.regForm.get('email');
    }

    get password() {
        return this.regForm.get('password');
    }

    public register(): void {
        if (this.regForm.invalid) {
            return;
        }

        this.isSubmitting = true;

        const regData = this.prepareRegData();

        this.regService.regUser(regData).subscribe({
            next: () => {
                this.handleRegistrationSuccess();
            },
            error: (error) => {
                this.handleRegistrationError(error);
            },
        });
    }

    private prepareRegData(): IRegForm {
        const { name, email, password } = this.regForm.value;

        return {
            name: name ?? '',
            email: email ?? '',
            password: password ?? '',
        };
    }

    private handleRegistrationSuccess(): void {
        this.isSubmitting = false;
        this.toastService.showSuccess('Registration successful!');
        this.regForm.reset();
        this.router.navigate(['auth', 'signin']);
    }

    private handleRegistrationError(error: HttpErrorResponse): void {
        this.isSubmitting = false;

        switch (error.error.type) {
            case 'InvalidFormDataException':
                this.handleInvalidFormDataError(error.error.message);
                break;
            case 'PrimaryDuplicationException':
                this.handleUserExistsError(error.error.message);
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

    private handleUserExistsError(error: string): void {
        const email = this.email?.value as string;
        if (email && !this.duplicateEmails.includes(email)) {
            this.duplicateEmails.push(email);
            this.email?.setErrors({ taken: true });
        }
        this.toastService.showError(error);
    }

    private handleFormDataRequired(error: string): void {
        this.name?.setErrors({ taken: true });
        this.email?.setErrors({ taken: true });
        this.password?.setErrors({ taken: true });
        this.toastService.showError(error);
    }
}
