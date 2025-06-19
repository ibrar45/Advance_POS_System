import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './Shared/Login and signup/signup/signup.component';
import { LoginComponent } from './Shared/Login and signup/login/login.component';
import { MainLayoutComponent } from './Shared/Layout/main-layout/main-layout.component';
import { CustomerRecordsComponent } from './Main/HardCode data show/customer-records/customer-records.component';
import { MobileDataComponent } from './Main/HardCode Mobile data/mobile-data/mobile-data.component';

const routes: Routes = [

 
  
   
  {
    path: 'main',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./Main/Setup/setup.module').then(m => m.SetupModule)
      },

      //{
      //  path: '',
      //  loadChildren: () => import('./Main/Sales/sales.module').then(m => m.SalesModule)
      //},

      //{
      //  path: '',
      //  loadChildren: () => import('./Main/Customer/customer.module').then(m => m.CustomerModule)
      //},


      //{ path: '', redirectTo: 'login', pathMatch: 'full' },
      //{ path: 'login', component: LoginComponent },
      //{ path: 'signup', component: SignupComponent },

      // Sirf layout component load karna ho
      //{ path: 'main', component: MainLayoutComponent },

      //{ path: '**', redirectTo: 'login' }
    ]
  },
 { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
