import { Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { LlistaRegUsuarisComponent } from './llista-reg-usuaris/llista-reg-usuaris.component';
import { RegisterComponent } from '../auth/register/register.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
      {
				path: 'users',
        component: LlistaRegUsuarisComponent,
        canActivate: [AuthGuard],
				data: {
					title: 'Llista usuaris registrats'
        }
      },
      {
				path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard],
				data: {
					title: 'Crear usuaris'
        }
      }
		]
	}
];
