import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { DashboardComponent } from './dashboard.component'
import { dashboardRoutes } from './routes'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  declarations: [
    DashboardComponent
  ]
})

export class DashboardModule { }
