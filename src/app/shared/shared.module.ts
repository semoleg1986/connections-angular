import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularModule } from '../material/angular.module';
import { BaseComponent } from './components/base/base.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';

@NgModule({
    declarations: [
        BaseComponent,
        CustomButtonComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AngularModule,
    ],
    exports: [
        AngularModule,
        BaseComponent,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CustomButtonComponent,
    ],
})
export class SharedModule { }
