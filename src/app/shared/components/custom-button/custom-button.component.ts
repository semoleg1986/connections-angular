import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-custom-button',
    templateUrl: './custom-button.component.html',
    styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
    @Input() size = 'normal';

    @Input() disabled = false;

    get buttonSize(): string {
        switch (this.size) {
            case 'small':
                return 'small-button';
            default:
                return 'normal-button';
        }
    }
}
