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
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'discover',
    pathMatch: 'full',
  },
];
