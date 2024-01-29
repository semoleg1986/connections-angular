import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './shared/components/base/base.component';
import { LoginGuardService } from './auth/guards/login.guard.service';
import { AuthGuardService } from './auth/guards/auth.guard.service';
import { NonPageComponent } from './core/pages/non-page/non-page.component';

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () => import('./auth/auth.module').then((mod) => mod.AuthModule),
                canActivate: [LoginGuardService],
            },
            {
                path: '',
                loadChildren: () => import('./chat/chat.module').then((mod) => mod.ChatModule),
                canActivate: [AuthGuardService],
            },
            {
                path: '**',
                component: NonPageComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
