import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegPageComponent } from './pages/reg-page/reg-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
    },
    {
        path: 'signup',
        component: RegPageComponent,
    },
    {
        path: 'signin',
        component: LoginPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
