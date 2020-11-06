import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FullComponent } from './layouts/full/full.component';
import { Page404Component } from './pages/page404/page404.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,

    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        canActivate: [AuthGuard],
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }
    ]
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'register', component:RegisterComponent,canActivate: [AuthGuard]
  },
  {
    path: '**', component:Page404Component
  }
];
