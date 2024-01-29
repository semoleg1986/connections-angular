import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const password = control.value;

        const hasDigit = /[0-9]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[*!@#$%^&(){}[\]:;<>,.?~_+\-=|\\/"']/g.test(password);

        const errors: { [key: string]: boolean } = {};

        if (!hasDigit) {
            errors['hasDigit'] = true;
        }

        if (!hasUpperCase) {
            errors['hasUpperCase'] = true;
        }

        if (!hasSpecialChar) {
            errors['hasSpecialChar'] = true;
        }

        return Object.keys(errors).length ? errors : null;
    };
}
