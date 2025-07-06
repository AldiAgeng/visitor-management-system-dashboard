import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component').then((c) => c.DashboardComponent),
        canActivate: [RoleGuard(['superuser', 'receptionist'])]
      },
      {
        path: 'users',
        loadComponent: () => import('./demo/pages/users/users').then((c) => c.Users),
        canActivate: [RoleGuard(['superuser'])]
      },
      {
      path: 'users/create',
      loadComponent: () => import('./demo/pages/users/create/create-user.component').then(c => c.CreateUserComponent),
      canActivate: [RoleGuard(['superuser'])]
      },
      {
        path: 'users/edit/:id',
        loadComponent: () => import('./demo/pages/users/edit/edit-user.component').then(c => c.EditUserComponent),
        canActivate: [RoleGuard(['superuser'])]
      },
      {
        path: 'devices',
        loadComponent: () => import('./demo/pages/devices/devices.component').then((c) => c.DevicesComponent),
        canActivate: [RoleGuard(['superuser', 'administrator'])]
      },
      {
        path: 'devices/create',
        loadComponent: () => import('./demo/pages/devices/create/create.component').then(c => c.CreateDeviceComponent),
        canActivate: [RoleGuard(['superuser', 'administrator'])]
      },
      {
        path: 'devices/edit/:id',
        loadComponent: () => import('./demo/pages/devices/edit/edit.component').then(c => c.EditDeviceComponent),
        canActivate: [RoleGuard(['superuser', 'administrator'])]
      },
      {
        path: 'visitors',
        loadComponent: () => import('./demo/pages/visitors/visitors.component').then(c => c.VisitorsComponent),
        canActivate: [RoleGuard(['superuser', 'receptionist'])]
      },
      {
        path: 'visitors/create',
        loadComponent: () => import('./demo/pages/visitors/create/create.component').then(c => c.CreateComponent),
        canActivate: [RoleGuard(['superuser', 'receptionist'])]
      },
      {
        path: 'visitors/edit/:id',
        loadComponent: () =>
          import('./demo/pages/visitors/edit/edit.component').then(c => c.EditComponent),
        canActivate: [RoleGuard(['superuser', 'receptionist'])]
      },
      {
        path: 'unauthorized',
        loadComponent: () => import('./demo/pages/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/pages/authentication/auth-signin/auth-signin.component').then((c) => c.AuthSigninComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/pages/authentication/auth-signup/auth-signup.component').then((c) => c.AuthSignupComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
