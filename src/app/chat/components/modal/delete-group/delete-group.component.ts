import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteGroup } from 'src/app/redux/actions/group/group.action';

@Component({
    selector: 'app-delete-group',
    templateUrl: './delete-group.component.html',
    styleUrls: ['./delete-group.component.scss'],
})
export class DeleteGroupComponent {
    isDeleting = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { groupId: string; caller: string },
        private store: Store,
        private router: Router,
        private dialogRef: MatDialogRef<DeleteGroupComponent>,
    ) {}

    deleteGroup(): void {
        const { groupId, caller } = this.data;
        if (caller) {
            this.store.dispatch(deleteGroup({ groupId }));
        } else {
            this.store.dispatch(deleteGroup({ groupId }));
            this.router.navigate(['/']);
        }
        this.dialogRef.close();
    }

    close(): void {
        this.dialogRef.close();
    }
}
