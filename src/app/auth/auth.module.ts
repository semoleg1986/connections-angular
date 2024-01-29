import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RegPageComponent } from './pages/reg-page/reg-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
    declarations: [
        RegPageComponent,
        LoginPageComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
    ],
})
export class AuthModule { }
