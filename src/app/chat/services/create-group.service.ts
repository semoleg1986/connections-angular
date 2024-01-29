import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CreateGroupService {
    userDataString = localStorage.getItem('userData');

    getAuthUid(): string | null {
        if (this.userDataString) {
            const userData = JSON.parse(this.userDataString);
            const { uid } = userData;
            return uid || null;
        }
        return null;
    }

    createGroupItem(id: string, name: string) {
        const authUid = this.getAuthUid();
        return {
            createdAt: {
                S: Date.now().toString(),
            },
            id: {
                S: id,
            },
            createdBy: {
                S: authUid || '',
            },
            name: {
                S: name,
            },
        };
    }
}
