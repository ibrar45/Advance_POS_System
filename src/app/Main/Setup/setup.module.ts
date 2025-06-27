import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupRoutingModule } from './setup-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
      MatCardModule,
      ReactiveFormsModule,
    MatIconModule,
FormsModule

  ]
})
export class SetupModule { }
