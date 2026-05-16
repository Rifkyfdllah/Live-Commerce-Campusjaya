import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'discover',
    loadComponent: () => import('./discover/discover.page').then((m) => m.DiscoverPage),
  },
  {
    path: 'live-room/:id',
    loadComponent: () => import('./live-room/live-room.page').then((m) => m.LiveRoomPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.page').then((m) => m.CartPage),
  },
  {
    path: '',
    redirectTo: 'discover',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.page').then( m => m.RegisterPage)
  },
];
