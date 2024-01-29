import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createGroup } from 'src/app/redux/actions/group/group.action';

const groupNamePattern = /^[^\s][\p{L}\d ]*$/u;

@Component({
    selector: 'app-create-group',
    templateUrl: './create-group.component.html',
    styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent {
    createForm = this.fb.group({
        name: ['', [
            Validators.required,
            Validators.pattern(groupNamePattern),
        ]],
    });

    constructor(
        private dialogRef: MatDialogRef<CreateGroupComponent>,
        private fb: FormBuilder,
        private store: Store,
    ) {}

    get name() {
        return this.createForm.get('name');
    }

    createGroup(): void {
        const groupName = this.createForm.value.name as string;
        if (this.createForm.valid) {
            this.store.dispatch(createGroup({ name: groupName }));
        }
    }

    close(): void {
        this.dialogRef.close();
    }
}
