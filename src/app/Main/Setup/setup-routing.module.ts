import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyInfoComponent } from '../company-info/company-info.component';
import { CustomerRecordsComponent } from '../HardCode data show/customer-records/customer-records.component';
import { MobileDataComponent } from '../HardCode Mobile data/mobile-data/mobile-data.component';
import { SalesDetailsComponent } from '../sales-details/sales-details.component';
import { GeneralSettingComponent } from '../general-setting/general-setting.component';
import { TotalSalesComponent } from '../Sales/total-sales/total-sales.component';
import { ProductsComponent } from '../products/products.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { EmployeeComponent } from '../employee/employee.component';

const routes: Routes = [

  {
    path: 'setup',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'totalsales', component: TotalSalesComponent },
      { path: 'companyinfo', component: CompanyInfoComponent },
      { path: 'Customer', component: CustomerRecordsComponent },
      { path: 'MobileData', component: MobileDataComponent },
       { path: 'SalesDetail', component:  SalesDetailsComponent},
      { path: 'Generalsetting', component: GeneralSettingComponent},
      { path: 'products', component: ProductsComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'employee', component: EmployeeComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
