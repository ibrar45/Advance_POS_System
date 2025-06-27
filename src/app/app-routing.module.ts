import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Shared/Login and signup/login/login.component';
import { MainLayoutComponent } from './Shared/Layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainLayoutComponent,
    children: [
      {
        path: 'setup',
        loadChildren: () => import('./Main/Setup/setup.module').then(m => m.SetupModule)
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
