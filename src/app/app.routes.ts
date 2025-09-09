import { Routes } from '@angular/router';
import { Home } from './pages/no-logged/login/home';
import { Register } from './pages/no-logged/register/register';
import { Home as HomeLogged } from './pages/logged/home/home';
import { CreateMovie } from './pages/logged/create-movie/create-movie';
import { Login } from './components/not-logged/login/login';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
export const routes: Routes = [
    {
        path: 'login',
        component: Login,
        canActivate: [guestGuard]
    },
    {
        path: 'registrar',
        component: Register,
        canActivate: [guestGuard]
    },
    {
        path: '',
        component: HomeLogged,
        canActivate: [authGuard]
    },
    {
        path:'criar-filme',
        component: CreateMovie,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
]