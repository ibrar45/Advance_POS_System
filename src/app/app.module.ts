import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './Shared/Layout/main-layout/main-layout.component';
import { LoginComponent } from './Shared/Login and signup/login/login.component';
import { SignupComponent } from './Shared/Login and signup/signup/signup.component';
import { TotalSalesComponent } from './Main/Sales/total-sales/total-sales.component';
import { TotalRevenueComponent } from './Main/Sales/total-revenue/total-revenue.component';
import { CustomerDataComponent } from './Main/Customer/customer-data/customer-data.component';
import { CustomerRecordsComponent } from './Main/HardCode data show/customer-records/customer-records.component';
import { MobileDataComponent } from './Main/HardCode Mobile data/mobile-data/mobile-data.component';
import { CompanyInfoComponent } from './Main/company-info/company-info.component';
import { SalesDetailsComponent } from './Main/sales-details/sales-details.component';
import { GeneralSettingComponent } from './Main/general-setting/general-setting.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './Main/products/products.component';
import { InventoryComponent } from './Main/inventory/inventory.component';
// import { EmpoyeeAiComponent } from './Main/empoyee-ai/empoyee-ai.component';
import { EmployeeComponent } from './Main/employee/employee.component';

//import { DashboardComponent } from './Main/Setup/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginComponent,
    SignupComponent,
    TotalSalesComponent,
    TotalRevenueComponent,
    CustomerDataComponent,
    CustomerRecordsComponent,
    MobileDataComponent,
    CompanyInfoComponent,
    SalesDetailsComponent,
    GeneralSettingComponent,
    ProductsComponent,
    InventoryComponent,
    // EmpoyeeAiComponent,
    EmployeeComponent,
    //DashboardComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
