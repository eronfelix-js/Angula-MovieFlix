import { Routes } from '@angular/router';
import { Home } from './pages/no-logged/login/home';
import { Register } from './pages/no-logged/register/register';
import { Home as HomeLogged } from './pages/logged/home/home';
export const routes: Routes = [
    {
        path: 'login',
        component: Home
    },
    {
        path: 'registrar',
        component: Register
    },
    {
        path: '',
        component: HomeLogged
    }
   
]