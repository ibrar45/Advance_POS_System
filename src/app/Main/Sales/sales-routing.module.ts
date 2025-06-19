import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotalSalesComponent } from './total-sales/total-sales.component';
import { TotalRevenueComponent } from './total-revenue/total-revenue.component';

const routes: Routes = [

  {
    path: 'sales',
    children: [
      { path: 'total-sales', component: TotalSalesComponent },
      { path: 'total-revenue', component: TotalRevenueComponent },

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
