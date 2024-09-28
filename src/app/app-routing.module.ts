import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './core/page-login/page-login.component';

const routes: Routes = [
  { path: '', component: PageLoginComponent },
  {
    path: 'agencies',
    canLoad: [],
    loadChildren: () =>
      import('./agency/agency.module').then((m) => m.AgencyModule),
  },
  {
    path: 'channels',
    canLoad: [],
    loadChildren: () =>
      import('./channel/channel.module').then((m) => m.ChannelModule),
  },
  {
    path: 'clients',
    canLoad: [],
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'employees',
    canLoad: [],
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'qr',
    canLoad: [],
    loadChildren: () =>
      import('./qr/qr.module').then((m) => m.QrModule),
  },
  {
    path: 'follow-up',
    canLoad: [],
    loadChildren: () =>
      import('./follow-up/follow-up.module').then((m) => m.FollowUpModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
