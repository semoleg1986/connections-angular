import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getProfile, updateProfile } from 'src/app/redux/actions/profile/profile.action';
import { Observable, Subject, filter } from 'rxjs';
import { selectUserProfile } from 'src/app/redux/selectors/profile.selectors';
import { IUpdateProfile, IUserProfile } from '../../models/profile.interface';

const namePattern = /^[\p{L} ]+$/u;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
    profileForm: FormGroup = new FormGroup({});

    isNameEditing = false;

    public isStaticPage = true;

    originalNameValue = '';

    private destroy$: Subject<void> = new Subject<void>();

    profileData$: Observable<IUserProfile | null> = this.store.select(selectUserProfile).pipe(
        filter((data) => !!data),
    );

    constructor(
        private fb: FormBuilder,
        private store: Store,
    ) { }

    ngOnInit(): void {
        this.getProfileData();
        this.initProfileForm();
        this.loadProfileData();
    }

    get name() {
        return this.profileForm.get('name');
    }

    private getProfileData() {
        this.store.dispatch(getProfile());
    }

    private initProfileForm() {
        this.profileForm = this.fb.group({
            uid: [{ value: '', disabled: true }],
            email: [{ value: '', disabled: true }],
            created: [{ value: '', disabled: true }],
            name: [{ value: '', disabled: true }, [
                Validators.required,
                Validators.pattern(namePattern),
                Validators.maxLength(40),
            ]],
        });
    }

    private loadProfileData() {
        this.profileData$.subscribe((profileData: IUserProfile | null) => {
            if (profileData) {
                const {
                    uid, email, name, createdAt,
                } = profileData;
                const createdAtUnix = createdAt?.S || '';
                const createdAtFormatted = new Date(parseInt(createdAtUnix, 10)).toISOString().split('T')[0];
                this.profileForm.patchValue({
                    uid: uid?.S || '',
                    email: email?.S || '',
                    created: createdAtFormatted,
                    name: name?.S || '',
                });
            }
        });
    }

    public toggleNameEdit() {
        const nameField = this.profileForm.get('name');

        if (nameField) {
            if (this.isNameEditing) {
                nameField.disable();
            } else {
                this.originalNameValue = nameField.value;
                this.isStaticPage = false;
                nameField.enable();
                nameField.markAsTouched();
            }
            this.isNameEditing = !this.isNameEditing;
        }
    }

    public cancelChanges() {
        const nameField = this.profileForm.get('name');

        if (nameField) {
            if (this.isNameEditing) {
                nameField.patchValue(this.originalNameValue);
                nameField.disable();
            }
            this.isNameEditing = false;
            this.isStaticPage = true;
        }
    }

    public saveChanges() {
        if (this.profileForm.valid) {
            const nameField = this.profileForm.get('name');

            if (nameField && this.isNameEditing) {
                const newName: IUpdateProfile = {
                    name: nameField.value,
                };

                if (nameField.value !== this.originalNameValue) {
                    this.store.dispatch(updateProfile(newName));
                }

                this.toggleNameEdit();
                this.isStaticPage = true;
            }
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.profileForm.reset();
    }
}
