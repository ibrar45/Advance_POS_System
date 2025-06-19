import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDataComponent } from './customer-data/customer-data.component';

const routes: Routes = [

  {
    path: 'customer',
    children: [
      { path: 'CustomerData', component: CustomerDataComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
